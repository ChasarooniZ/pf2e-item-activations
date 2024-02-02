import { ITEM_LIST, ITEM_SLUGS } from "./helpers/item-list";

Hooks.on("ready", () => {
    console.error("PF2e Item Activation is ready");
    if (!game.user.isGM) return;
    ui.notifications.info("PF2e Item Activations")
    //game.RPGNumbers = new RPGNumbers();
    Hooks.on("updateItem", async function (item, changes, diff, id) {
        console.log(`PF2E-ITEM-ACTIVATIONS:`, item, changes, diff);
        if (!checkIfMatters(item.system.slug)) return;
        const conditions = getActivationConditions(item);
        const changeType = checkChangeType(item?.system?.equipped, changes?.system?.equipped, conditions);
        console.log({ changeType });
        if (changeType == 'none') return;
        addOrRemoveActivation(item, changeType)
        switch (changeType) {
            case 'on':
                break;
            case 'off':
                break;
            case 'none':
                break;
            case 'default':
                break;
        }
        //     console.log({ enable: game.settings.get("pf2e-item-activations", 'enabled'), debug: game.settings.get("pf2e-item-activations", 'debug-mode') })
        //     if (!game.settings.get("pf2e-item-activations", 'enabled')) return;
        //     if (game.user.isGM) {
        //         debugLog({
        //             item
        //         }, "Item")
        //         
        //         debugLog({ actions, isProperlyEquipped, isProperlyInvested }, "RemoveOrAdd");
        //         removeOrAddActions(item.actor, actions, isProperlyEquipped && isInvestProper);
        //     }
    });
})

// export function checkIfImportantUpdate(item) {
//     let actions = item.rules.filter((rule) => rule.key === "GrantItem").map(rule => rule.uuid);
//     if (actions.length === 0) return;
//     const isProperlyInvested = item.system.traits.value.includes("invested") === !!item.isInvested;
//     let isProperlyEquipped = false;
//     if (item.system.usage.value === "held-in-one-hand") {
//         isProperlyEquipped = item.isHeld;
//     } else if (item.system.usage.type === "worn") {
//         isProperlyEquipped = item.isWorn;
//     }
//     return isProperlyEquipped && isProperlyInvested;
// }

// export function removeOrAddActions(actor, itemIds, isAdd = true) {
//     const actions = [];
// for (uuid in itemIds) {
//     let action = await fromUuid(uuid);
//     actions.push(action.toObject());
// }
//     if (isAdd) {
//         actor.createEmbeddedDocuments("Item", actions);
//     } else {
//         const actionSlugs = actions.map(action => action.slug);
//         actor.deleteEmbeddedDocuments("Item", actor.items.filter(item => actionSlugs.includes(item.slug)).map(item => item.slug));
//     }
// }

/**
 * Checks if the item is in the list
 * @param {string} slug Slug of item to check for
 * @returns True if item is in list
 */
export function checkIfMatters(slug) {
    return ITEM_SLUGS.includes(slug);
}

/**
 * Get item activation conditions
 * @param {*} item Item to get conditions of
 * @returns Item Activation conditions
 */
export function getActivationConditions(item) {
    const usage = {
        carryType: item.type,
        handsHeld: 0,
        invested: false,
        inSlot: false
    }

    if (item.system?.equipped?.invested !== null)
        usage.invested = true;
    switch (item?.system?.equipped?.type) {
        case 'worn':
            if (item?.system?.equipped?.value !== 'worn') {
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
    const oldQualified = isQualified(itemEquipmentStatus, usageConditions);
    const combinedStatus = Object.assign(itemEquipmentStatus, changesToEquipment)
    const newQualified = isQualified(combinedStatus, usageConditions);
    if (oldQualified === newQualified) {
        return 'None'
    } else if (oldQualified && !newQualified) {
        return 'Off'
    } else if (!oldQualified && newQualified) {
        return 'On'
    }
}

export function isQualified(itemEquipmentStatus, usageConditions) {
    if (usageConditions.invested && !itemEquipmentStatus?.invested) {
        return false;
    }
    if (itemEquipmentStatus.handsHeld >= usageConditions.handsHeld) {
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

/**
 * 
 * @param {*} item 
 * @param {'On' | 'Off | 'None'} changeType 
 */
export function addOrRemoveActivation(item, changeType) {
    const actor = item.actor;
    const slug = item.system.slug;
    const actions_uuid = ITEM_LIST[slug].actions;
    if (actions_uuid.length === 0) return;
    const actions = actions_uuid.map(uuid => fromUuidSync(uuid).toObject());
    if (changeType === 'On') {
        actor.createEmbeddedDocuments("Item", actions);
    } else if (changeType === 'Off') {
        const actionSlugs = actions.map(action => action.slug);
        actor.deleteEmbeddedDocuments("Item", actor.items.filter(item => actionSlugs.includes(item.slug)).map(item => item.slug));
    }
}

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-item-activations", 'debug-mode'))
        console.log(`PF2E-ITEM-ACTIVATIONs: ${context}`, data);
}