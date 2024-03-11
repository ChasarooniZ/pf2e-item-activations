import { deactivateAction, activateAction, turnOnOffActivation } from "./helpers/activate.js";
import { generateActivations, hasActivations } from "./helpers/generate-activation.js";
import { ITEM_LIST, ITEM_SLUGS } from "./helpers/item-list.js";
import { indexSlugs, MODULE_ID } from "./helpers/misc.js";
import { checkChangeTypeNPC, isQualifiedNPC } from "./helpers/npc.js";
import { augmentAction } from "./helpers/on-create.js";
import { checkChangeTypePC, isQualifiedPC } from "./helpers/pc.js";
import { actionStyling } from "./helpers/style-item.js";

Hooks.on("ready", () => {
    if (game.settings.get(MODULE_ID, 'enabled'))
        indexSlugs()
    console.log("PF2e Item Activation is ready");
    Hooks.on("updateItem", async function (item, changes, diff, userID) {
        if (!game.settings.get(MODULE_ID, 'enabled')) return;
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        debugLog({ item, changes, diff, userID }, "Start");
        if (!checkIfMatters(item, changes)) return;
        if (item.actor.type === 'npc') {
            if (!game.settings.get(MODULE_ID, 'npc.enabled')) return;
            const conditions = getActivationConditions(item);
            const changeType = checkChangeTypeNPC(item?.system?.equipped, changes?.system?.equipped, conditions);
            debugLog(changeType, 'ChangeTypeNPC')
            if (changeType == 'None') return;
            let test = await turnOnOffActivation(item, changeType);
        } else {
            if (!item.isIdentified) return;
            const conditions = getActivationConditions(item);
            const changeType = checkChangeTypePC(item?.system?.equipped, changes?.system?.equipped, conditions);
            debugLog(changeType, 'ChangeType')
            if (changeType == 'None') return;
            let test = await turnOnOffActivation(item, changeType);
        }
    });
    Hooks.on("createItem", async (item, options, userID) => {
        if (!game.settings.get(MODULE_ID, 'enabled')) return;
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        if (!checkIfMatters(item)) return;
        debugLog({ actorType: item.actor.type, equipped: item?.system?.equipped, item }, 'createItem')
        if (item.actor.type === 'npc') {
            if (!game.settings.get(MODULE_ID, 'npc.enabled')) return;
            let test = await addOrDeleteActivation(item, 'Add');
            const conditions = getActivationConditions(item);
            if (!isQualifiedNPC(item?.system?.equipped, conditions)) {
                let test2 = await turnOnOffActivation(item, 'Off');
            }
        } else {
            if (!item.isIdentified) return;
            let test = await addOrDeleteActivation(item, 'Add');
            const conditions = getActivationConditions(item);
            if (!isQualifiedPC(item?.system?.equipped, conditions)) {
                let test2 = await turnOnOffActivation(item, 'Off');
            }
        }
    });

    Hooks.on("preDeleteItem", async (item, options, userID) => {
        if (!game.settings.get(MODULE_ID, 'enabled')) return;
        if (item.actor.type === 'npc' && !game.settings.get(MODULE_ID, 'npc.enabled')) return;
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        if (!checkIfMatters(item) || !item.isIdentified) return;
        let test = await addOrDeleteActivation(item, 'Delete');
    });

    Hooks.on("createToken", async (token, details, userID) => {
        if (!game.settings.get(MODULE_ID, 'enabled')) return;
        if (!game.settings.get(MODULE_ID, 'npc.enabled')) return;
        if (!game.settings.get(MODULE_ID, 'npc.on-create-token')) return;
        if (userID !== game.user.id) return;
        if (token.actor.type === 'npc') {
            let test = await updateTokensActivations(token);
        }
    })


    hooks.on('renderActorSheet', (sheet, html, info) => {
        const actor = info.actor;
        actionStyling(actor);
    })

})

export async function updateTokensActivations(token) {
    const actor = token.actor;
    if (actor.type === 'npc') {
        for (const item of actor.items.filter(item => checkIfMatters(item))) {
            let test = await addOrDeleteActivation(item, 'Add');
            const conditions = getActivationConditions(item);
            if (!isQualifiedNPC(item?.system?.equipped, conditions)) {
                let test2 = await turnOnOffActivation(item, 'Off');
            }
        }
    } else {
        for (const item of actor.items.filter(item => checkIfMatters(item) && item.isIdentified)) {
            let test = await addOrDeleteActivation(item, 'Add');
            const conditions = getActivationConditions(item);
            if (!isQualifiedPC(item?.system?.equipped, conditions)) {
                let test2 = await turnOnOffActivation(item, 'Off');
            }
        }
    }
}

/**
 * Checks if the item is in the list
 * @param {string} slug Slug of item to check for
 * @returns True if item is in list
 */
export function checkIfMatters(item, changes) {
    return (ITEM_SLUGS.includes(item.system.slug) || (hasActivations(item) && game.settings.get(MODULE_ID, 'auto-gen.enabled'))) && (changes?.system?.equipped || changes === undefined);
}

/**
 * Get item activation conditions
 * @param {*} item Item to get conditions of
 * @returns Item Activation conditions
 */
export function getActivationConditions(item) {
    const usage = {
        carryType: item?.system?.usage?.type,
        handsHeld: 0,
        invested: false,
        inSlot: false
    }

    if (item.system?.equipped?.invested !== null)
        usage.invested = true;
    switch (item?.system?.usage?.type) {
        case 'worn':
            if (item?.system?.usage?.value !== 'worn') {
                usage.inSlot = true;
            }
            break;
        case 'held':
            usage.handsHeld = item.system.usage.hands;
        default:
            break;
    }
    return usage;
}

export function isChangeImportant(changesToEquipment, usageConditions) {
    if (changesToEquipment?.invested !== null) {
        return true;
    }
    if (changesToEquipment?.handsHeld !== null) {
        return true;
    }
    if (changesToEquipment?.inSlot !== null) {
        return true;
    }
    if (changesToEquipment?.carryType !== null) {
        return true;
    }

    return false
}

export async function checkAndGetMissingActivations(item, conditions) {
    const actor = item.actor;
    const slug = item.system.slug;
    const actions_uuid = ITEM_LIST[slug].actions;
    if (actions_uuid.length === 0) return;
    const actions = [];
    for (const uuid of actions_uuid) {
        try {
            let actionItem = await fromUuid(uuid);
            actions.push(actionItem.toObject());
        } catch (error) {
            console.error("Error retrieving action item:", error);
        }
    }
    let toAdd = actions.filter(action => !actor.items.some(existingItem => existingItem.system.slug === action.system.slug));
    if (toAdd.length > 0) {
        const notQualified = isQualifiedPC(item?.system?.equipped, conditions);
        if (notQualified) {
            toAdd = toAdd.map(action => ({
                ...action,
                name: activateAction(action).name
            }));
        }
        actor.createEmbeddedDocuments("Item", toAdd);
    }
}

/**
 * 
 * @param {*} item 
 * @param {'Add' | 'Delete'} type
 * @returns 
 */
export async function addOrDeleteActivation(item, changeType) {
    const actor = item.actor;
    const slug = item.system.slug;
    let actions = [];
    if (ITEM_SLUGS.includes(item.system.slug)) { //Premade
        const actions_uuid = ITEM_LIST[slug].actions;
        if (actions_uuid.length === 0) return;
        for (const uuid of actions_uuid) {
            try {
                let actionItem = await fromUuid(uuid);
                actionItem = actionItem.toObject();
                if (actor.items.some(existingItem => existingItem.system.slug === actionItem.system.slug)) {
                    actions.push(actionItem);
                } else {
                    actions.push(augmentAction(actionItem, item))
                }
            } catch (error) {
                console.error("Error retrieving action item:", error);
            }
        }
    } else { //On the Fly
        actions = generateActivations(item).map(act => augmentAction(act, item));
        debugLog({ actions }, 'Auto Create');
    }
    if (changeType === 'Add') {
        if (item.actor.type === "npc" ?
            !isQualifiedNPC(item?.system?.equipped, getActivationConditions(item)) :
            !isQualifiedPC(item?.system?.equipped, getActivationConditions(item)))
            action = actions.map(action => deactivateAction(action))
        debugLog({ actions }, 'Add')
        await actor.createEmbeddedDocuments("Item", actions);
    } else if (changeType === 'Delete') {
        const actionSlugs = actions.map(action => action.system.slug);
        const deleteIds = actor.items.filter(existingItem => existingItem.getFlag(MODULE_ID, "grantedBy") === item.id).map(existingItem => existingItem.id);
        debugLog({ actions, actionSlugs, deleteIds }, 'Delete')
        await actor.deleteEmbeddedDocuments("Item", deleteIds);
    }
}

export function debugLog(data, context = "") {
    if (game.settings.get(MODULE_ID, 'debug-mode'))
        console.log(`PF2E-ITEM-ACTIVATIONS: ${context}`, data);
}