// Import necessary constants and functions
import { MODULE_ID } from "./const.js";

/**
 * Styles disabled actions for the given actor
 * @param {object} actor The actor to style disabled actions for
 */
export function actionStyling(actor, html) {
    // Get all items belonging to the actor
    const items = actor.items.contents;

    // Get IDs of disabled actions
    const disabledActionsIDs = getDisabledActions(items);
    const enabledActionsIDs = getEnabledActions(items);

    // Style all disabled actions
    styleAllDisabledActions(disabledActionsIDs, html);
    styleAllEnabledActions(enabledActionsIDs, html);
}

/**
 * Styles all disabled actions based on their IDs
 * @param {string[]} ids Array of IDs of disabled actions
 */
function styleAllDisabledActions(ids, html) {
    // Apply styling to each disabled action
    ids.forEach((id) => {
        styleDisabledAction(id, html);
    });
}

/**
 * Styles all enabled actions based on their IDs
 * @param {string[]} ids Array of IDs of disabled actions
 */
function styleAllEnabledActions(ids, html) {
    // Apply styling to each enabled action
    ids.forEach((id) => {
        styleEnabledAction(id, html);
    });
}

/**
 * Styles a disabled action based on its ID
 * @param {string} id The ID of the disabled action
 */
function styleDisabledAction(id, html) {
    // Find the item element by its ID
    const item = html.find(`[data-item-id='${id}']`);
    if (!item) return;
    // Apply specific style to the disabled action
    item.addClass("disabled-activation");
}

/**
 * Styles a enabled action based on its ID
 * @param {string} id The ID of the disabled action
 */
function styleEnabledAction(id, html) {
    // Find the item element by its ID
    const item = html.find(`[data-item-id='${id}']`);
    if (!item) return;
    // Apply specific style to the disabled action
    item.addClass("enabled-activation");
}

/**
 * Retrieves IDs of disabled actions from the given items
 * @param {object[]} items Array of items to check for disabled actions
 * @returns {string[]} Array of IDs of disabled actions
 */
function getDisabledActions(items) {
    // Filter items to get disabled ones and map them to their IDs
    return items.filter((it) => it?.flags?.[MODULE_ID]?.enabled === false).map((i) => i.id);
}

/**
 * Retrieves IDs of disabled actions from the given items
 * @param {object[]} items Array of items to check for disabled actions
 * @returns {string[]} Array of IDs of disabled actions
 */
function getEnabledActions(items) {
    // Filter items to get disabled ones and map them to their IDs
    return items.filter((it) => it?.flags?.[MODULE_ID]?.enabled === true).map((i) => i.id);
}
