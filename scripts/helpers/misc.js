// Import necessary constants and functions
import { ITEM_LIST } from "./item-list.js";

// Constant defining the module ID
export const MODULE_ID = 'pf2e-item-activations';

/**
 * Indexes slugs for items in the ITEM_LIST
 */
export function indexSlugs() {
    // Get the index of item activations pack
    const index = game.packs.get("pf2e-item-activations.item-activations").index;

    // Iterate through each item in the ITEM_LIST
    for (let item in ITEM_LIST) {
        // Map each action UUID to its corresponding slug
        ITEM_LIST[item].slugs = ITEM_LIST[item].actions.map(uuid =>
            game.pf2e?.system?.sluggify(index.get(uuid.split('.').slice(-1)[0]).name)
        );
    }
}

/**
 * Sets a module flag for the given item
 * @param {object} item The item to set the flag for
 * @param {string} flagName The name of the flag to set
 * @param {*} value The value to set for the flag
 * @returns {object} The item with the flag set
 */
export function setModuleFlag(item, flagName, value) {
    // Ensure item has a flags object
    if (!item?.flags)
        item.flags = {};

    // Ensure item has a flags object for the module
    if (!item?.flags?.[MODULE_ID])
        item.flags[MODULE_ID] = {};

    // Set the value for the specified flag
    item.flags[MODULE_ID][flagName] = value;

    return item;
}
