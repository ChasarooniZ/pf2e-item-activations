// Import groups
import { TEXT, MODULE_ID, setModuleFlag } from "./misc.js";

/**
 * Augments an action with item information
 * @param {object} action The action to augment
 * @param {object} item The item granting the action
 * @returns {object} The augmented action
 */
export function augmentAction(action, item) {
    let resultAction = { ...action };

    // Concatenate item information to action description
    resultAction.system.description.value = `<p>${TEXT.GRANTED_BY_TEXT} ${item.link}</p>`.concat(
        action.system.description.value
    );

    //Update Icons
    if (game.settings.get(MODULE_ID, "action-type-icon")) resultAction.img = getActionImage(action);

    // Set module flag indicating the item granting the action
    resultAction = setModuleFlag(action, "grantedBy", item);

    return resultAction;
}

function getActionImage(item) {
    const action = {
        type: item.system.actionType.value,
        cnt: item.system.actions.value,
    };
    if (action.type === "action") {
        if (action.cnt === 1) {
            return "systems/pf2e/icons/actions/OneAction.webp";
        } else if (action.cnt === 2) {
            return "systems/pf2e/icons/actions/TwoActions.webp";
        } else if (action.cnt === 3) {
            return "systems/pf2e/icons/actions/ThreeActions.webp";
        }
    } else if (action.type === "reaction") {
        return "systems/pf2e/icons/actions/Reaction.webp";
    } else if (action.type === "free") {
        return "systems/pf2e/icons/actions/FreeAction.webp";
    }

    return item.img;
}
