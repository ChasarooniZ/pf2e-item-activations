import { debugLog } from "./helpers/debug.js";
import { deactivateAction, activateAction, turnOnOffActivation } from "./helpers/activate.js";
import { generateActivations, hasActivations } from "./helpers/generate-activation.js";
import { ITEM_LIST, ITEM_SLUGS } from "./helpers/item-list.js";
import { IGNORED_TYPES, MODULE_ID } from "./helpers/misc.js";
import { checkChangeTypeNPC, isQualifiedNPC } from "./helpers/npc.js";
import { augmentAction } from "./helpers/on-create.js";
import { checkChangeTypePC, isQualifiedPC } from "./helpers/pc.js";
import { registerAPI } from "./api.js";
import { sendUpdateMessage } from "./tours/updateMessage.js";

// Hook attachment functions
Hooks.on("ready", () => {
    console.log("PF2e Item Activations is getting ready....");
    Hooks.on("updateItem", async (item, changes, diff, userID) => {
        if (skipUpdateItem(item, userID)) {
            return;
        }

        debugLog({ item, changes, diff, userID }, "Start");

        if (!checkIfMatters(item, changes)) {
            return;
        }

        const conditions = getActivationConditions(item);
        const changeType =
            item.actor.type === "npc"
                ? checkChangeTypeNPC(item?.system?.equipped, changes?.system?.equipped, conditions)
                : checkChangeTypePC(item?.system?.equipped, changes?.system?.equipped, conditions);

        debugLog(changeType, item.actor.type === "npc" ? "ChangeTypeNPC" : "ChangeType");

        if (changeType !== "None") {
            await turnOnOffActivation(item, changeType);
        }
    });
    Hooks.on("createItem", async (item, _options, userID) => {
        if (skipCreateItem(item, userID)) {
            return;
        }

        debugLog({ actorType: item.actor.type, equipped: item?.system?.equipped, item }, "createItem");

        const conditions = getActivationConditions(item);
        await addOrDeleteActivation(item, "Add");

        if (isQualified(item, conditions)) {
            await turnOnOffActivation(item, "Off");
        }
    });
    Hooks.on("preDeleteItem", async (item, _options, userID) => {
        if (skipDeleteItem(item, userID)) {
            return;
        }

        await addOrDeleteActivation(item, "Delete");
    });
    Hooks.on("createToken", async (token, _details, userID) => {
        if (skipCreateToken(userID, token)) {
            return;
        }

        await updateTokensActivations(token);
    });
    registerAPI();
    if (game.user.isGM) {
        sendUpdateMessage();
    }
    console.log("PF2e Item Activation is initialized");
});

function isQualified(item, conditions) {
    return item.actor.type === "npc"
        ? !isQualifiedNPC(item?.system?.equipped, conditions)
        : !item.isIdentified || !isQualifiedPC(item?.system?.equipped, conditions);
}

export function skipUpdateItem(item, userID) {
    return (
        !game.settings.get(MODULE_ID, "enabled") ||
        !item.actor ||
        ["party", "loot", "hazard", "vehicle"].includes(item.actor.type) ||
        userID !== game.user.id
    );
}

export function skipCreateItem(item, userID) {
    return (
        !game.settings.get(MODULE_ID, "enabled") ||
        !item.actor ||
        userID !== game.user.id ||
        ["party", "loot", "hazard", "vehicle"].includes(item.actor.type) ||
        !checkIfMatters(item) ||
        (item.actor.type === "npc" && !game.settings.get(MODULE_ID, "npc.enabled"))
    );
}

export function skipCreateToken(userID, token) {
    return (
        !game.settings.get(MODULE_ID, "enabled") ||
        !game.settings.get(MODULE_ID, "npc.enabled") ||
        !game.settings.get(MODULE_ID, "npc.on-create-token") ||
        userID !== game.user.id ||
        token.actor.type !== "npc"
    );
}

export function skipDeleteItem(item, userID) {
    return (
        !game.settings.get(MODULE_ID, "enabled") ||
        !item.actor ||
        userID !== game.user.id ||
        (item.actor.type === "npc" && !game.settings.get(MODULE_ID, "npc.enabled")) ||
        !checkIfMatters(item) ||
        !item.isIdentified
    );
}

// Function for 'renderActorSheet' hook
/* TODO function onRenderActorSheet(sheet, html, info) {
  const actor = info.actor;
  actionStyling(actor);
}*/

export async function updateTokensActivations(token) {
    const actor = token.actor;
    const relevantItems = actor.items.filter((item) => checkIfMatters(item));

    for (const item of relevantItems) {
        await addOrDeleteActivation(item, "Add");
        const conditions = getActivationConditions(item);

        if (
            actor.type === "npc"
                ? isQualifiedNPC(item?.system?.equipped, conditions)
                : item.isIdentified && isQualifiedPC(item?.system?.equipped, conditions)
        ) {
            await turnOnOffActivation(item, "On");
        } else {
            await turnOnOffActivation(item, "Off");
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
    return (
        (ITEM_SLUGS.includes(item.system.slug) ||
            (!IGNORED_TYPES.includes(
                item.type
            ) &&
                !item.system?.traits?.value?.includes("consumable") &&
                game.settings.get(MODULE_ID, "auto-gen.enabled") &&
                hasActivations(item))) &&
                item.isIdentified &&
        (changes?.system?.equipped || changes === undefined)
    );
}

/**
 * Get item activation conditions
 * @param {object} item The item to get conditions of
 * @returns {object} Item Activation conditions
 */
export function getActivationConditions(item) {
    const { system } = item;
    const usage = {
        carryType: system?.usage?.type,
        handsHeld: 0,
        invested: false,
        inSlot: false,
    };

    if (system?.traits?.value?.includes("invested")) usage.invested = true;

    switch (system?.usage?.type) {
        case "worn":
            if (system?.usage?.value !== "worn") {
                usage.inSlot = true;
            }
            break;
        case "held":
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
export function isChangeImportant(changesToEquipment, _usageConditions) {
    return (
        changesToEquipment?.invested !== null ||
        changesToEquipment?.handsHeld !== null ||
        changesToEquipment?.inSlot !== null ||
        changesToEquipment?.carryType !== null
    );
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

    let toAdd = actions.filter(
        (action) => !actor.items.some((existingItem) => existingItem.system.slug === action.system.slug)
    );

    if (toAdd.length > 0) {
        const notQualified = isQualifiedPC(item?.system?.equipped, conditions);

        if (notQualified) {
            toAdd = toAdd.map((action) => ({
                ...action,
                name: activateAction(action).name,
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

    if (changeType === "Add") {
        let actions = [];

        if (ITEM_SLUGS.includes(item.system.slug)) {
            // Premade
            const actions_uuid = ITEM_LIST[item.system.slug].actions;

            for (const uuid of actions_uuid) {
                let actionItem = await fromUuid(uuid);
                actions.push(augmentAction(actionItem.toObject(), item));
            }
        } else {
            // On the Fly
            actions = generateActivations(item).map((act) => augmentAction(act, item));
            debugLog({ actions }, "Auto Create");
        }

        const usageConditions = getActivationConditions(item);
        const qualified =
            actor.type === "npc"
                ? isQualifiedNPC(item.system.equipped, usageConditions)
                : isQualifiedPC(item.system.equipped, usageConditions);

        if (!qualified) {
            actions = actions.map((action) => deactivateAction(action));
        }

        debugLog({ actions }, "Add");
        await actor.createEmbeddedDocuments("Item", actions);
    } else if (changeType === "Delete") {
        const deleteIds = actor.items
            .filter((existingItem) => existingItem?.flags?.[MODULE_ID]?.grantedBy?._id === item.id)
            .map((existingItem) => existingItem.id);

        debugLog({ deleteIds }, "Delete");
        await actor.deleteEmbeddedDocuments("Item", deleteIds);
    }
}
