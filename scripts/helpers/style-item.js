// Import necessary constants and functions
import { MODULE_ID } from "./misc.js";

/**
 * Styles disabled actions for the given actor
 * @param {object} actor The actor to style disabled actions for
 */
export function actionStyling(actor) {
    // Get all items belonging to the actor
    const items = actor.items.contents;

    // Get IDs of disabled actions
    const disabledActionsIDs = getDisabledActions(items);

    // Style all disabled actions
    styleAllDisabledActions(disabledActionsIDs);
}

/**
 * Styles all disabled actions based on their IDs
 * @param {string[]} ids Array of IDs of disabled actions
 */
function styleAllDisabledActions(ids) {
    // Apply styling to each disabled action
    ids.forEach((id) => {
        styleDisabledActionF(id);
    });
}

/**
 * Styles a disabled action based on its ID
 * @param {string} id The ID of the disabled action
 */
function styleDisabledAction(id) {
    // Find the item element by its ID
    const item = document.querySelector(`[data-item-id='${id}']`);

    // Apply specific style to the disabled action
    item.style["background-size"] = "40px 40px";
    item.style["background-image"] =
        "linear-gradient(45deg, #e3e3e31f 25%, #9999991f 25%, #9999991f 50%, #e3e3e31f 50%, #e3e3e31f 75%, #9999991f 75%, #9999991f 100%)";
}

/**
 * Retrieves IDs of disabled actions from the given items
 * @param {object[]} items Array of items to check for disabled actions
 * @returns {string[]} Array of IDs of disabled actions
 */
function getDisabledActions(items) {
    // Filter items to get disabled ones and map them to their IDs
    return items.filter((it) => !it?.flags?.[MODULE_ID]?.enabled).map((i) => i.id);
}
