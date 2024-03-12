import { deactivateAction, activateAction, turnOnOffActivation } from "./helpers/activate.js";
import { generateActivations, hasActivations } from "./helpers/generate-activation.js";
import { ITEM_LIST, ITEM_SLUGS } from "./helpers/item-list.js";
import { indexSlugs, MODULE_ID } from "./helpers/misc.js";
import { checkChangeTypeNPC, isQualifiedNPC } from "./helpers/npc.js";
import { augmentAction } from "./helpers/on-create.js";
import { checkChangeTypePC, isQualifiedPC } from "./helpers/pc.js";
import { actionStyling } from "./helpers/style-item.js";

// Hook attachment functions
Hooks.on("ready", onReady);
Hooks.on("updateItem", onUpdateItem);
Hooks.on("createItem", onCreateItem);
Hooks.on("preDeleteItem", onPreDeleteItem);
Hooks.on("createToken", onCreateToken);
//Hooks.on("renderActorSheet", onRenderActorSheet);

// Main function for 'ready' hook
function onReady() {
    if (game.settings.get(MODULE_ID, 'enabled')) {
        indexSlugs();
    }
    console.log("PF2e Item Activation is ready");
}

// Function for 'updateItem' hook
async function onUpdateItem(item, changes, diff, userID) {
    if (!game.settings.get(MODULE_ID, 'enabled') || !item.actor || item.actor.type === "party" || userID !== game.user.id) {
        return;
    }

    debugLog({ item, changes, diff, userID }, "Start");

    if (!checkIfMatters(item, changes)) {
        return;
    }

    const conditions = getActivationConditions(item);
    const changeType = item.actor.type === 'npc' ? checkChangeTypeNPC(item?.system?.equipped, changes?.system?.equipped, conditions) : checkChangeTypePC(item?.system?.equipped, changes?.system?.equipped, conditions);

    debugLog(changeType, item.actor.type === 'npc' ? 'ChangeTypeNPC' : 'ChangeType');

    if (changeType !== 'None') {
        await turnOnOffActivation(item, changeType);
    }
}

// Function for 'createItem' hook
async function onCreateItem(item, options, userID) {
    if (!game.settings.get(MODULE_ID, 'enabled') || !item.actor || userID !== game.user.id || !checkIfMatters(item) || (item.actor.type === 'npc' && !game.settings.get(MODULE_ID, 'npc.enabled'))) {
        return;
    }

    debugLog({ actorType: item.actor.type, equipped: item?.system?.equipped, item }, 'createItem');

    const conditions = getActivationConditions(item);
    let test = await addOrDeleteActivation(item, 'Add');

    if (item.actor.type === 'npc' ? !isQualifiedNPC(item?.system?.equipped, conditions) : !item.isIdentified || !isQualifiedPC(item?.system?.equipped, conditions)) {
        await turnOnOffActivation(item, 'Off');
    }
}

// Function for 'preDeleteItem' hook
async function onPreDeleteItem(item, options, userID) {
    if (!game.settings.get(MODULE_ID, 'enabled') || !item.actor || userID !== game.user.id || item.actor.type === 'npc' && !game.settings.get(MODULE_ID, 'npc.enabled') || !checkIfMatters(item) || !item.isIdentified) {
        return;
    }

    await addOrDeleteActivation(item, 'Delete');
}

// Function for 'createToken' hook
async function onCreateToken(token, details, userID) {
    if (!game.settings.get(MODULE_ID, 'enabled') || !game.settings.get(MODULE_ID, 'npc.enabled') || !game.settings.get(MODULE_ID, 'npc.on-create-token') || userID !== game.user.id || token.actor.type !== 'npc') {
        return;
    }

    await updateTokensActivations(token);
}

// Function for 'renderActorSheet' hook
function onRenderActorSheet(sheet, html, info) {
    const actor = info.actor;
    actionStyling(actor);
}

export async function updateTokensActivations(token) {
    const actor = token.actor;
    const relevantItems = actor.items.filter(item => checkIfMatters(item));

    for (const item of relevantItems) {
        let test = await addOrDeleteActivation(item, 'Add');
        const conditions = getActivationConditions(item);

        if (actor.type === 'npc' && !isQualifiedNPC(item?.system?.equipped, conditions)) {
            let test2 = await turnOnOffActivation(item, 'Off');
        } else if (!item.isIdentified && !isQualifiedPC(item?.system?.equipped, conditions)) {
            let test2 = await turnOnOffActivation(item, 'Off');
        }
    }
}

/**
 * Checks if the item is relevant for activation
 * @param {object} item The item to check
 * @param {object} changes Changes in the item
 * @returns {boolean} True if the item is relevant for activation
 */
export function checkIfMatters(item, changes) {
    return (ITEM_SLUGS.includes(item.system.slug)
        || (hasActivations(item)
            && game.settings.get(MODULE_ID, 'auto-gen.enabled')
            && item.type !== 'consumable')
    ) && (changes?.system?.equipped || changes === undefined);
}

/**
 * Get item activation conditions
 * @param {object} item The item to get conditions of
 * @returns {object} Item Activation conditions
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
            break; // Added break statement
        default:
            break;
    }
    return usage;
}
/**
 * Checks if the change in equipment is important
 * @param {object} changesToEquipment Changes to equipment
 * @param {object} usageConditions Usage conditions
 * @returns {boolean} True if the change is important
 */
export function isChangeImportant(changesToEquipment, usageConditions) {
    return changesToEquipment?.invested !== null ||
        changesToEquipment?.handsHeld !== null ||
        changesToEquipment?.inSlot !== null ||
        changesToEquipment?.carryType !== null;
}

/**
 * Checks and adds missing activations for an item
 * @param {object} item The item to check activations for
 * @param {object} conditions Activation conditions
 */
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
 * Adds or deletes an activation for an item
 * @param {object} item The item to add or delete activation for
 * @param {string} changeType Type of change (Add or Delete)
 */
export async function addOrDeleteActivation(item, changeType) {
    const actor = item.actor;
    const slug = item.system.slug;
    let actions = [];

    if (changeType === 'Add') {
        if (ITEM_SLUGS.includes(item.system.slug)) { //Premade
            const actions_uuid = ITEM_LIST[slug].actions;

            if (actions_uuid.length === 0) return;

            for (const uuid of actions_uuid) {
                let actionItem = await fromUuid(uuid);
                actionItem = actionItem.toObject();
                actions.push(augmentAction(actionItem, item))
            }
        } else { //On the Fly
            actions = generateActivations(item).map(act => augmentAction(act, item));
            debugLog({ actions }, 'Auto Create');
        }

        if (actor.type === "npc" ?
            !isQualifiedNPC(item?.system?.equipped, getActivationConditions(item)) :
            !isQualifiedPC(item?.system?.equipped, getActivationConditions(item))) {
            actions = actions.map(action => deactivateAction(action));
        }

        debugLog({ actions }, 'Add');
        await actor.createEmbeddedDocuments("Item", actions);
    } else if (changeType === 'Delete') {
        const deleteIds = actor.items.filter(
            existingItem => existingItem?.flags?.[MODULE_ID]?.grantedBy?._id === item.id
        ).map(
            existingItem => existingItem.id
        );

        debugLog({ actions, deleteIds }, 'Delete');
        await actor.deleteEmbeddedDocuments("Item", deleteIds);
    }
}

export function debugLog(data, context = "") {
    if (game.settings.get(MODULE_ID, 'debug-mode'))
        console.log(`PF2E-ITEM-ACTIVATIONS: ${context}`, data);
}