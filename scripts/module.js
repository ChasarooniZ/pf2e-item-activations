import { ITEM_LIST, ITEM_SLUGS } from "./helpers/item-list.js";

Hooks.on("ready", () => {
    const index = game.packs.get("pf2e-item-activations.item-activations").index;
    for (let item in ITEM_LIST) {
        ITEM_LIST[item].slugs = ITEM_LIST[item].actions.map(uuid =>
            game.pf2e.system.sluggify(index.get(uuid.split('.').slice(-1)[0]).name)
        );
    }
    console.log("PF2e Item Activation is ready");
    Hooks.on("updateItem", async function (item, changes, diff, userID) {
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        debugLog({ item, changes, diff, userID }, "Start");
        if (!checkIfMatters(item.system.slug, changes) || !item.isIdentified) return;
        const conditions = getActivationConditions(item);
        const changeType = checkChangeType(item?.system?.equipped, changes?.system?.equipped, conditions);
        debugLog(changeType, 'ChangeType')
        if (changeType == 'None') return;
        let test = await turnOnOffActivation(item, changeType);
    });
    Hooks.on("createItem", async (item, options, userID) => {
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        if (!checkIfMatters(item.system.slug) || !item.isIdentified) return;
        let test = await addOrDeleteActivation(item, 'Add');
        const conditions = getActivationConditions(item);
        if (!isQualified(item?.system?.equipped, conditions)) {
            let test2 = await turnOnOffActivation(item, 'Off');
        }
    });

    Hooks.on("preDeleteItem", async (item, options, userID) => {
        if (!item.actor) return;
        if (userID !== game.user.id) return;
        if (!checkIfMatters(item.system.slug) || !item.isIdentified) return;
        let test = await addOrDeleteActivation(item, 'Delete');
    });

})

/**
 * Checks if the item is in the list
 * @param {string} slug Slug of item to check for
 * @returns True if item is in list
 */
export function checkIfMatters(slug, changes = {}) {
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
        const notQualified = isQualified(item?.system?.equipped, conditions);
        const marker = '[X]';
        if (notQualified) {
            toAdd = toAdd.map(item => ({
                ...item, name: marker.concat(' ', item.name)
            }))
        }
        actor.createEmbeddedDocuments("Item", toAdd);
    }
}

/**
 * 
 * @param {*} item 
 * @param {'On' | 'Off | 'None'} changeType 
 */
export async function turnOnOffActivation(item, changeType) {
    const marker = '[X]';
    const actor = item.actor;
    const slug = item.system.slug;
    const actionSlugs = ITEM_LIST[slug].slugs;
    if (actionSlugs.length === 0) return;
    const actions = [];
    const missingActions = [];
    for (const itemSlug of actionSlugs) {
        const item = actor.items.find(item => item.system.slug === itemSlug);
        if (item) {
            actions.push(item);
        } else {
            missingActions.push(itemSlug)
        }
    }
    const nameIds = actions.map(action => ({
        _id: action.id,
        name: action.name.replaceAll(marker, '').trim()
    }))
    if (changeType === 'On') {
        if (missingActions.length > 0) {
            const activations = [];
            for (const actionSlug of missingActions) {
                let idx = ITEM_LIST[slug].slugs.indexOf(actionSlug);
                let action = await fromUuid(ITEM_LIST[slug].actions[idx]);
                action = action.toObject()
                action.description = `<p>Granted by ${item.link}</p>`.concat(action.description)
                activations.push(action)
            }
            actor.createEmbeddedDocuments("Item", activations);
        }
        actor.updateEmbeddedDocuments("Item", nameIds);
    } else if (changeType === 'Off') {
        actor.updateEmbeddedDocuments("Item", nameIds.map(item => ({
            _id: item._id,
            name: marker.concat(' ', item.name)
        })));
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
        it = item.toObject();
        item.description = `<p>Granted by ${item.link}</p>`.concat(it.description)
        actions.push(it)
    }
    if (changeType === 'Add') {
        actor.createEmbeddedDocuments("Item", actions);
    } else if (changeType === 'Delete') {
        const actionSlugs = actions.map(action => action.system.slug);
        actor.deleteEmbeddedDocuments("Item", actor.items.filter(item => actionSlugs.includes(item.system.slug)).map(item => item.id));
    }
}

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-item-activations", 'debug-mode'))
        console.log(`PF2E-ITEM-ACTIVATIONs: ${context}`, data);
}