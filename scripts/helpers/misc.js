// Constant defining the module ID
export const MODULE_ID = "pf2e-item-activations";
export const TEXT = {};
export const IGNORED_TYPES = [
    "consumable",
    "action",
    "feat",
    "heritage",
    "ancestry",
    "background",
    "class",
    "spell",
    "melee",
    "ranged",
];
export const IGNORE_IN_SLOT = ["tattooed-on-the-body"];

Hooks.on("ready", () => {
    TEXT.ACTIVATE_TEXT = game.i18n.format("pf2e-item-activations.code.activate");
    TEXT.ACTIVATION_TEXT = game.i18n.format("pf2e-item-activations.code.activation");
    TEXT.FREQUENCY_TEXT = game.i18n.format("pf2e-item-activations.code.frequency");
    TEXT.GRANTED_BY_TEXT = game.i18n.format("pf2e-item-activations.code.granted-by");
    TEXT.COMMAND_TEXT = game.i18n.format("pf2e-item-activations.code.activation-traits.command");
    TEXT.ENVISION_TEXT = game.i18n.format("pf2e-item-activations.code.activation-traits.envision");
    TEXT.INTERACT_TEXT = game.i18n.format("pf2e-item-activations.code.activation-traits.interact");
    TEXT.TIME = {
        turn: game.i18n.format("pf2e-item-activations.code.time.turn"),
        round: game.i18n.format("pf2e-item-activations.code.time.round"),
        minute: game.i18n.format("pf2e-item-activations.code.time.minute"),
        "ten-minutes": game.i18n.format("pf2e-item-activations.code.time.ten-minutes"),
        hour: game.i18n.format("pf2e-item-activations.code.time.hour"),
        "twenty-four-hours": game.i18n.format("pf2e-item-activations.code.time.twenty-four-hours"),
        day: game.i18n.format("pf2e-item-activations.code.time.day"),
        week: game.i18n.format("pf2e-item-activations.code.time.week"),
        month: game.i18n.format("pf2e-item-activations.code.time.month"),
        year: game.i18n.format("pf2e-item-activations.code.time.year"),
    };
    TEXT.COUNT = {
        once: game.i18n.format("pf2e-item-activations.code.count.once"),
        twice: game.i18n.format("pf2e-item-activations.code.count.twice"),
        threeTimes: game.i18n.format("pf2e-item-activations.code.count.three-times"),
    }
    TEXT.PER = game.i18n.format("pf2e-item-activations.code.per")
    TEXT.INVALID_ACTIVATIONS = [game.i18n.format("pf2e-item-activations.code.invalid-activations.staff")].map(
        (t) => new RegExp(t)
    );
});
/**
 * Sets a module flag for the given item
 * @param {object} item The item to set the flag for
 * @param {string} flagName The name of the flag to set
 * @param {*} value The value to set for the flag
 * @returns {object} The item with the flag set
 */
export function setModuleFlag(item, flagName, value) {
    // Ensure item has a flags object
    if (!item?.flags) item.flags = {};

    // Ensure item has a flags object for the module
    if (!item?.flags?.[MODULE_ID]) item.flags[MODULE_ID] = {};

    // Set the value for the specified flag
    item.flags[MODULE_ID][flagName] = value;

    return item;
}

// Helper to generate similar rule elements
export const makeFlatModifier = (selector, value, predicate = undefined) => [
    {
        key: "FlatModifier",
        selector,
        type: "item",
        value,
        ...(predicate && { predicate }),
    },
];

export const makeFlatCheckAlteration = (type, value) => [
    {
        itemType: "condition",
        key: "ItemAlteration",
        mode: "downgrade",
        predicate: [`item:damage:type:${type}`],
        property: "pd-recovery-dc",
        value,
    },
];

export const makeResistance = (type, value = 5) => [
    {
        key: "Resistance",
        type,
        value,
    },
];
