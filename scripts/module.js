import { deactivateAction, activateAction, turnOnOffActivation } from "./helpers/activate.js";
import { ITEM_LIST, ITEM_SLUGS } from "./helpers/item-list.js";
import { indexSlugs } from "./helpers/misc.js";
import { checkChangeTypeNPC, isQualifiedNPC } from "./helpers/npc.js";
import { checkChangeTypePC, isQualifiedPC } from "./helpers/pc.js";

Hooks.on("ready", () => {
    indexSlugs()
    console.log("PF2e Item Activation is ready");
    Hooks.on("updateItem", async function (item, changes, diff, userID) {
        if (!game.settings.get("pf2e-item-activations", 'enabled')) return;
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        debugLog({ item, changes, diff, userID }, "Start");
        if (!checkIfMatters(item.system.slug, changes)) return;
        if (item.actor.type === 'npc') {
            if (!game.settings.get("pf2e-item-activations", 'npc.enabled')) return;
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
        if (!game.settings.get("pf2e-item-activations", 'enabled')) return;
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        if (!checkIfMatters(item.system.slug)) return;
        debugLog({ actorType: item.actor.type, equipped: item?.system?.equipped, conditions, item }, 'createItem')
        if (item.actor.type === 'npc') {
            if (!game.settings.get("pf2e-item-activations", 'npc.enabled')) return;
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
        if (!game.settings.get("pf2e-item-activations", 'enabled')) return;
        if (item.actor.type === 'npc' && !game.settings.get("pf2e-item-activations", 'npc.enabled')) return;
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        if (!checkIfMatters(item.system.slug) || !item.isIdentified) return;
        let test = await addOrDeleteActivation(item, 'Delete');
    });

    Hooks.on("createToken", async (token, details, userID) => {
        if (!game.settings.get("pf2e-item-activations", 'enabled')) return;
        if (!game.settings.get("pf2e-item-activations", 'npc.enabled')) return;
        if (!game.settings.get("pf2e-item-activations", 'npc.on-create-token')) return;
        if (userID !== game.user.id) return;
        if (token.actor.type === 'npc') {
            let test = await updateTokensActivations(token);
        }
    })

})

export async function updateTokensActivations(token) {
    const actor = token.actor;
    if (actor.type === 'npc') {
        for (const item of actor.items.filter(item => checkIfMatters(item.system.slug))) {
            let test = await addOrDeleteActivation(item, 'Add');
            const conditions = getActivationConditions(item);
            if (!isQualifiedNPC(item?.system?.equipped, conditions)) {
                let test2 = await turnOnOffActivation(item, 'Off');
            }
        }
    } else {
        for (const item of actor.items.filter(item => checkIfMatters(item.system.slug) && item.isIdentified)) {
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
export function checkIfMatters(slug, changes) {
    return ITEM_SLUGS.includes(slug) && (changes?.system?.equipped || changes === undefined);
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
        let item = await fromUuid(uuid)
        actions.push(item.toObject())
    }
    let toAdd = actions.filter(action => !actor.items.some(item => item.system.slug === action.system.slug));
    if (toAdd.length > 0) {
        const notQualified = isQualifiedPC(item?.system?.equipped, conditions);
        if (notQualified) {
            toAdd = toAdd.map(action => ({
                ...action, name: activateAction(action).name
            }))
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
    const actions_uuid = ITEM_LIST[slug].actions;
    if (actions_uuid.length === 0) return;
    const actions = [];
    for (const uuid of actions_uuid) {
        let it = await fromUuid(uuid)
        it = it.toObject();
        if (!actor.items.some(i => i.system.slug === it.system.slug)) {
            it = augmentAction(it, item)
            actions.push(it)
        }
    }
    if (changeType === 'Add') {
        if (
            item.actor.type === "npc" ?
            !isQualifiedNPC(item?.system?.equipped, getActivationConditions(item)) :
            !isQualifiedPC(item?.system?.equipped, getActivationConditions(item)))
                action = actions.map(action => deactivateAction(action))
        debugLog({ actions }, 'Add')
        actor.createEmbeddedDocuments("Item", actions);
    } else if (changeType === 'Delete') {
        const actionSlugs = actions.map(action => action.system.slug);
        const deleteIds = actor.items.filter(item => actionSlugs.includes(item.system.slug)).map(item => item.id);
        debugLog({ actions, actionSlugs, deleteIds }, 'Delete')
        actor.deleteEmbeddedDocuments("Item", deleteIds);
    }
}

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-item-activations", 'debug-mode'))
        console.log(`PF2E-ITEM-ACTIVATIONS: ${context}`, data);
}