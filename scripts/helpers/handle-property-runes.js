import { generateActivations } from "./generate-activation.js";
import { MODULE_ID, setModuleFlag } from "./misc.js";
import { augmentAction } from "./on-create.js";

const RUNE_ACTIVATIONS = {
    sizeChanging: "Compendium.pf2e.equipment-srd.Item.Z5FvYWLEpWVo3PUF",
    fanged: "Compendium.pf2e.equipment-srd.Item.pcGdJvwun0tjrUTz",
    greaterFanged: "Compendium.pf2e.equipment-srd.Item.cvb47A6K1w7RfNiv",
    majorFanged: "Compendium.pf2e.equipment-srd.Item.qL1S3vGfv8Dh5yAE",
    earthbinding: "Compendium.pf2e.equipment-srd.Item.OClYfRHzoynib6wX",
    cunning: "Compendium.pf2e.equipment-srd.Item.T4gTHDKJ0HI10p3y",
    raiment: "Compendium.pf2e.equipment-srd.Item.iTxqImupNnm8gvoe",
    pacifying: "Compendium.pf2e.equipment-srd.Item.R8I13CDRzvpVXOVe",
    swallowSpike: "Compendium.pf2e.equipment-srd.Item.BKjwg0TEGioiYpz1",
    greaterSwallowSpike: "Compendium.pf2e.equipment-srd.Item.ciykvIC4SFFxIfUw",
    majorSwallowSpike: "Compendium.pf2e.equipment-srd.Item.RRFyASbHcdclympe",
    hauling: "Compendium.pf2e.equipment-srd.Item.2ovu1AioLLff9p8w",
    greaterHauling: "Compendium.pf2e.equipment-srd.Item.o0XXVVymB8kluwLK",
    shifting: "Compendium.pf2e.equipment-srd.Item.roeYtwlIe65BPMJ1",
    energizing: "Compendium.pf2e.equipment-srd.Item.Qqh586pudsEqITUk",
    flickering: "Compendium.pf2e.equipment-srd.Item.p6RmUi2zCSmjd737",
    deathless: "Compendium.pf2e.equipment-srd.Item.kOEZCUTCPCqCFoJf",
    called: "Compendium.pf2e.equipment-srd.Item.QHc7AnKoMpcqsI2d",
    flurrying: "Compendium.pf2e.equipment-srd.Item.GNX0BNOoCSOYPedi",
    gliding: "Compendium.pf2e.equipment-srd.Item.A2Z7Mh8A59wZb5vv",
    invisibility: "Compendium.pf2e.equipment-srd.Item.VDudQ4x2ozosAbTb",
    greaterInvisibility: "Compendium.pf2e.equipment-srd.Item.bxz885LMjLCkpDq3",
};

const ACTIVATIONS_LIST = Object.keys(RUNE_ACTIVATIONS);

const RUNE_RULE_ELEMENTS = {
    assisting: [
        { key: "ActiveEffectLike", mode: "add", path: "inventory.bulk.encumberedAfterAddend", value: 1 },
        { key: "ActiveEffectLike", mode: "add", path: "inventory.bulk.maxAddend", value: 1 },
    ],
    slick: [
        {
            key: "FlatModifier",
            predicate: [
                {
                    or: ["action:escape", "action:squeeze"],
                },
            ],
            selector: "acrobatics",
            type: "item",
            value: 1,
        },
    ],
    greaterSlick: [
        {
            key: "FlatModifier",
            predicate: [
                {
                    or: ["action:escape", "action:squeeze"],
                },
            ],
            selector: "acrobatics",
            type: "item",
            value: 2,
        },
    ],
    majorSlick: [
        {
            key: "FlatModifier",
            predicate: [
                {
                    or: ["action:escape", "action:squeeze"],
                },
            ],
            selector: "acrobatics",
            type: "item",
            value: 3,
        },
    ],
    shadow: [
        {
            key: "FlatModifier",
            selector: "stealth",
            type: "item",
            value: 1,
        },
    ],
    greaterShadow: [
        {
            key: "FlatModifier",
            selector: "stealth",
            type: "item",
            value: 2,
        },
    ],
    majorShadow: [
        {
            key: "FlatModifier",
            selector: "stealth",
            type: "item",
            value: 3,
        },
    ],
    stanching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:bleed"],
            property: "pd-recovery-dc",
            value: 12,
        },
    ],
    greaterStanching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:bleed"],
            property: "pd-recovery-dc",
            value: 10,
        },
    ],
    majorStanching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:bleed"],
            property: "pd-recovery-dc",
            value: 8,
        },
    ],
    trueStanching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:acid"],
            property: "pd-recovery-dc",
            value: 5,
        },
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:fire"],
            property: "pd-recovery-dc",
            value: 5,
        },
    ],
    quenching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:acid"],
            property: "pd-recovery-dc",
            value: 12,
        },
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:fire"],
            property: "pd-recovery-dc",
            value: 12,
        },
    ],
    greaterQuenching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:acid"],
            property: "pd-recovery-dc",
            value: 10,
        },
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:fire"],
            property: "pd-recovery-dc",
            value: 10,
        },
    ],
    majorQuenching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:acid"],
            property: "pd-recovery-dc",
            value: 8,
        },
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:fire"],
            property: "pd-recovery-dc",
            value: 8,
        },
    ],
    trueQuenching: [
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:acid"],
            property: "pd-recovery-dc",
            value: 5,
        },
        {
            itemType: "condition",
            key: "ItemAlteration",
            mode: "downgrade",
            predicate: ["item:damage:type:fire"],
            property: "pd-recovery-dc",
            value: 5,
        },
    ],
    deathdrinking: [
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["death", "negative"],
            selector: "saving-throw",
            slug: "deathdrinking",
            type: "status",
            value: 1,
        },
    ],
    acidResistant: [
        {
            key: "resistance",
            type: "acid",
            value: 5,
        },
    ],
    coldResistant: [
        {
            key: "resistance",
            type: "cold",
            value: 5,
        },
    ],
    electricityResistant: [
        {
            key: "resistance",
            type: "electricity",
            value: 5,
        },
    ],
    fireResistant: [
        {
            key: "resistance",
            type: "fire",
            value: 5,
        },
    ],
    greaterAcidResistant: [
        {
            key: "resistance",
            type: "acid",
            value: 5,
        },
    ],
    greaterColdResistant: [
        {
            key: "resistance",
            type: "cold",
            value: 5,
        },
    ],
    greaterElectricityResistant: [
        {
            key: "resistance",
            type: "electricity",
            value: 5,
        },
    ],
    greaterFireResistant: [
        {
            key: "resistance",
            type: "fire",
            value: 5,
        },
    ],
};

export const RULE_ELEMENT_LIST = Object.keys(RUNE_RULE_ELEMENTS);

export const RELEVANT_PROPERTY_RUNE_LIST = [...ACTIVATIONS_LIST, ...RULE_ELEMENT_LIST];

export async function handlePropertyRunes(item) {
    //TODO Finishing handling rule elements adding anre vmoing properly
    if (!item?.system?.runes?.property?.some((r) => RELEVANT_PROPERTY_RUNE_LIST.includes(r))) return;
    const { rule_elements, activations } = getRelevantPropertyRunes(item);
    const final_activations = [];
    for (const rune of activations) {
        //TODO turn into promise all for efficiency
        const actives = await generateActivationForARune(item, RUNE_ACTIVATIONS[rune]);
        final_activations.push(...actives.map((act) => setModuleFlag(act, "rune", rune)));
    }
    const final_rules = [];
    for (const rune of rule_elements) {
        final_rules.push(...rune);
    }

    return { actives: final_activations, rules: final_rules };
}

export function getRelevantPropertyRunes(item) {
    return {
        rule_elements: (item?.system?.runes?.property ?? [])
            .filter((r) => RULE_ELEMENT_LIST.includes(r))
            .map((r) => getREsForARune(r).map((re) => ({ ...re, flags: { grantedBy: item.uuid, rune: r } }))),
        activations: (item?.system?.runes?.property ?? []).filter((r) => ACTIVATIONS_LIST.includes(r)),
    };
}

async function generateActivationForARune(item, runeUUID) {
    const rune = await fromUuid(runeUUID);
    return generateActivations(rune).map((act) => augmentAction(act, item));
}

function getREsForARune(runeShortName) {
    return RUNE_RULE_ELEMENTS?.[runeShortName] ?? [];
}

export function getRelevantRunesRemoved(changed_runes, current_runes) {
    const relevantChangedRunes = changed_runes.filter((r) => RELEVANT_PROPERTY_RUNE_LIST.includes(r));
    const relevantRunesRemoved = current_runes.filter(
        (r) => RELEVANT_PROPERTY_RUNE_LIST.includes(r) && !relevantChangedRunes.includes(r)
    );
    return relevantRunesRemoved;
}

export async function handleRemovedRunes(item, runes) {
    const actor = item?.actor;
    // Handle Activations
    if (runes.some((r) => ACTIVATIONS_LIST.includes(r))) {
        const deleteIds = actor.items
            .filter(
                (existingItem) =>
                    existingItem?.flags?.[MODULE_ID]?.grantedBy?._id === item.id &&
                    runes.includes(existingItem?.flags?.[MODULE_ID]?.rune)
            )
            .map((existingItem) => existingItem.id);

        await actor.deleteEmbeddedDocuments("Item", deleteIds);
    }

    if (runes.some((r) => RULE_ELEMENT_LIST.includes(r))) {
        await actor.updateEmbeddedDocuments("Item", [
            {
                _id: item.id,
                system: { rules: item.system.rules?.filter((r) => !runes.includes(r?.flags?.rune)) },
            },
        ]);
    }
    return;
}

export function getRelevantRunesAdded(changed_runes, current_runes) {
    const relevantCurrentRunes = current_runes.filter((r) => RELEVANT_PROPERTY_RUNE_LIST.includes(r));
    const relevantRunesAdded = changed_runes.filter(
        (r) => RELEVANT_PROPERTY_RUNE_LIST.includes(r) && !relevantCurrentRunes.includes(r)
    );
    return relevantRunesAdded;
}

/**
 *
 * @param {Item} item Item that runes are from
 * @param {String[]} runes Runes to add
 */
export async function handleAddedRunes(item, runes) {
    const actor = item?.actor;
    item.system.runes.property = runes;

    const { actives = [], rules = [] } = (await handlePropertyRunes(item)) || {};
    // Handle Activations
    if (actives.length > 0) {
        await actor.createEmbeddedDocuments("Item", actives);
    }
    if (rules.length > 0) {
        await actor.updateEmbeddedDocuments("Item", [
            {
                _id: item.id,
                system: { rules: foundry.utils.mergeObject(item.system.rules, rules) },
            },
        ]);
    }
    return;
}
