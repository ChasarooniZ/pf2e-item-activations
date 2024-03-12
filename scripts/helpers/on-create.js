// Import groups
import { setModuleFlag } from "./misc.js";

/**
 * Augments an action with item information
 * @param {object} action The action to augment
 * @param {object} item The item granting the action
 * @returns {object} The augmented action
 */
export function augmentAction(action, item) {
    const resultAction = action;
    
    // Concatenate item information to action description
    resultAction.system.description.value = `<p>Granted by ${item.link}</p>`.concat(action.system.description.value);
    
    // Set module flag indicating the item granting the action
    setModuleFlag(action, 'grantedBy', item);
    
    return resultAction;
}
