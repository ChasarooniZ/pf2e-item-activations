import { ITEM_LIST, ITEM_SLUGS } from "./helpers/item-list.js";

Hooks.on("ready", () => {
    console.error("PF2e Item Activation is ready");
    if (!game.user.isGM) return;
    ui.notifications.info("PF2e Item Activations")
    //game.RPGNumbers = new RPGNumbers();
    Hooks.on("updateItem", async function (item, changes, diff, id) {
        console.log(`PF2E-ITEM-ACTIVATIONS:`, item, changes, diff);
        if (!checkIfMatters(item.system.slug, changes) || !item.isIdentified) return;
        const conditions = getActivationConditions(item);
        const changeType = checkChangeType(item?.system?.equipped, changes?.system?.equipped, conditions);
        console.log({ changeType });
        if (changeType == 'none') return;
        let test = await addOrRemoveActivation(item, changeType);
    });
})

/**
 * Checks if the item is in the list
 * @param {string} slug Slug of item to check for
 * @returns True if item is in list
 */
export function checkIfMatters(slug, changes) {
    return ITEM_SLUGS.includes(slug) && changes?.system?.equipped;
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

/**
 * Check change type ('On', 'Off' or 'None')
 * @param {carryType?: string, handsHeld?: number, invested?: boolean, inSlot?: boolean} itemEquipmentStatus Item to check
 * @param {carryType?: string, handsHeld?: number, invested?: boolean, inSlot?: boolean} changes Changes made to item
 * @param {carryType?: string, handsHeld?: number, invested?: boolean, inSlot?: boolean} usageConditions usage type
 */
export function checkChangeType(itemEquipmentStatus, changesToEquipment, usageConditions) {
    const combinedStatus = Object.assign(itemEquipmentStatus, changesToEquipment)
    const qualified = isQualified(combinedStatus, usageConditions);
    const importantChange = isChangeImportant(changesToEquipment, usageConditions);
    //TODO Improve the checking on this to help with performance
    if (!importantChange) {
        return 'None'
    } else if (importantChange && !qualified) {
        return 'Off'
    } else if (importantChange && qualified) {
        return 'On'
    }
}

export function isQualified(itemEquipmentStatus, usageConditions) {
    if (usageConditions.invested && !itemEquipmentStatus?.invested) {
        return false;
    }
    if (usageConditions.handsHeld > itemEquipmentStatus.handsHeld) {
        return false;
    }
    if (usageConditions.inSlot && !itemEquipmentStatus.inSlot) {
        return false;
    }
    if (usageConditions.carryType !== itemEquipmentStatus.carryType) {
        return false;
    }

    return true;
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
    if (changesToEquipment?.carryType  !== null) {
        return true;
    }

    return false
}

/**
 * 
 * @param {*} item 
 * @param {'On' | 'Off | 'None'} changeType 
 */
export async function addOrRemoveActivation(item, changeType) {
    const actor = item.actor;
    const slug = item.system.slug;
    const actions_uuid = ITEM_LIST[slug].actions;
    if (actions_uuid.length === 0) return;
    const actions = [];
    for (const uuid of actions_uuid) {
        let item = await fromUuid(uuid)
        actions.push(item.toObject())
    }
    if (changeType === 'On') {
        actor.createEmbeddedDocuments("Item", actions);
    } else if (changeType === 'Off') {
        const actionSlugs = actions.map(action => action.system.slug);
        actor.deleteEmbeddedDocuments("Item", actor.items.filter(item => actionSlugs.includes(item.system.slug)).map(item => item.id));
    }
}

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-item-activations", 'debug-mode'))
        console.log(`PF2E-ITEM-ACTIVATIONs: ${context}`, data);
}