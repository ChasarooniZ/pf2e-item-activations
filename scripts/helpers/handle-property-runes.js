import { generateActivations } from "./generate-activation.js";
import { makeFlatCheckAlteration, makeFlatModifier, makeResistance, MODULE_ID, setModuleFlag } from "./misc.js";
import { augmentAction } from "./on-create.js";

const RUNE_ACTIVATIONS = {
    advancing: "Compendium.pf2e.equipment-srd.Item.45zjE7pj6FUHuz3K",
    animated: "Compendium.pf2e.equipment-srd.Item.DCPsilr8wbPXxTUv",
    antimagic: "Compendium.pf2e.equipment-srd.Item.o02lg3k1RBoFXVFV",
    bolkasBlessing: "Compendium.pf2e.equipment-srd.Item.AgDNThyJHtsp1Vjt",
    bloodthirsty: "Compendium.pf2e.equipment-srd.Item.fqnjZzwBi9GH4CXO",
    brilliant: "Compendium.pf2e.equipment-srd.Item.LbdnZFlyLFdAE617",
    called: "Compendium.pf2e.equipment-srd.Item.QHc7AnKoMpcqsI2d",
    cavernsHeart: "Compendium.pf2e.equipment-srd.Item.IA7ySNhJxINR7x2e",
    coating: "Compendium.pf2e.equipment-srd.Item.y9RUbQec9zGeqqcE",
    conducting: "Compendium.pf2e.actionspf2e.Item.BKnN9la3WNrRgZ6n",
    cunning: "Compendium.pf2e.equipment-srd.Item.T4gTHDKJ0HI10p3y",
    deathdrinking: "Compendium.pf2e.equipment-srd.Item.4DXupoMmwenFn4Kc",
    deathless: "Compendium.pf2e.equipment-srd.Item.kOEZCUTCPCqCFoJf",
    earthbinding: "Compendium.pf2e.equipment-srd.Item.OClYfRHzoynib6wX",
    energizing: "Compendium.pf2e.equipment-srd.Item.Qqh586pudsEqITUk",
    energyAdaptive: "Compendium.pf2e.equipment-srd.Item.DAWaXFtevHLUJxHB",
    ethereal: "Compendium.pf2e.equipment-srd.Item.q70WXJO1rswduHuT",
    extending: "Compendium.pf2e.equipment-srd.Item.bJORQsO9E1JCJh6i",
    fanged: "Compendium.pf2e.equipment-srd.Item.pcGdJvwun0tjrUTz",
    flickering: "Compendium.pf2e.equipment-srd.Item.p6RmUi2zCSmjd737",
    flurrying: "Compendium.pf2e.equipment-srd.Item.GNX0BNOoCSOYPedi",
    gliding: "Compendium.pf2e.equipment-srd.Item.A2Z7Mh8A59wZb5vv",
    greaterAdvancing: "Compendium.pf2e.equipment-srd.Item.1neYjXMc4srH7KQ0",
    greaterBolkasBlessing: "Compendium.pf2e.equipment-srd.Item.AgDNThyJHtsp1Vjt",
    greaterBrilliant: "Compendium.pf2e.equipment-srd.Item.n8MonEa4ZBdvEovc",
    greaterExtending: "Compendium.pf2e.equipment-srd.Item.WHwprq9Xym2DOr2x",
    greaterFanged: "Compendium.pf2e.equipment-srd.Item.cvb47A6K1w7RfNiv",
    greaterHauling: "Compendium.pf2e.equipment-srd.Item.o0XXVVymB8kluwLK",
    greaterInvisibility: "Compendium.pf2e.equipment-srd.Item.bxz885LMjLCkpDq3",
    greaterKolssOath: "Compendium.pf2e.equipment-srd.Item.BuQsMeD7IP4mvDCQ",
    greaterSwallowSpike: "Compendium.pf2e.equipment-srd.Item.ciykvIC4SFFxIfUw",
    greaterTruddsStrength: "Compendium.pf2e.equipment-srd.Item.wvo5Qaj5qn7jFHaA",
    greaterWinged: "Compendium.pf2e.equipment-srd.Item.Ztb4xv4UGZbF32TE",
    hauling: "Compendium.pf2e.equipment-srd.Item.2ovu1AioLLff9p8w",
    holy: "Compendium.pf2e.equipment-srd.Item.DH0kB9Wbr5pDeunX",
    invisibility: "Compendium.pf2e.equipment-srd.Item.VDudQ4x2ozosAbTb",
    immovable: "Compendium.pf2e.equipment-srd.Item.n8nLwFR4VFFmAny5",
    impossible: "Compendium.pf2e.equipment-srd.Item.uU4VC8OlhDHslT4i",
    kolssOath: "Compendium.pf2e.equipment-srd.Item.tvFMexALNZ70NVwh",
    magnetizing: "Compendium.pf2e.equipment-srd.Item.jrjwukkie7Y7wkxu",
    majorFanged: "Compendium.pf2e.equipment-srd.Item.qL1S3vGfv8Dh5yAE",
    majorSwallowSpike: "Compendium.pf2e.equipment-srd.Item.RRFyASbHcdclympe",
    malleable: "Compendium.pf2e.equipment-srd.Item.eHfL8Apfx4fxGksT",
    misleading: "Compendium.pf2e.equipment-srd.Item.68rHNRZmlnyaUbBF",
    pacifying: "Compendium.pf2e.equipment-srd.Item.R8I13CDRzvpVXOVe",
    portable: "Compendium.pf2e.equipment-srd.Item.VYXAdLJdF0XSeX5m",
    quickstrike: "Compendium.pf2e.equipment-srd.Item.KnZL0xPWDzQx9vWQ",
    raiment: "Compendium.pf2e.equipment-srd.Item.iTxqImupNnm8gvoe",
    serrating: "Compendium.pf2e.equipment-srd.Item.SV7W0lC2d8mfYuhy",
    shifting: "Compendium.pf2e.equipment-srd.Item.roeYtwlIe65BPMJ1",
    sinisterKnight: "Compendium.pf2e.equipment-srd.Item.QDYPr19De3TBIysx",
    sizeChanging: "Compendium.pf2e.equipment-srd.Item.Z5FvYWLEpWVo3PUF",
    spellReservoir: "Compendium.pf2e.equipment-srd.Item.payq4TwkN2BRF6fs",
    soaring: "Compendium.pf2e.equipment-srd.Item.CJtn848AL7Q0Lxf2",
    swallowSpike: "Compendium.pf2e.equipment-srd.Item.BKjwg0TEGioiYpz1",
    swarming: "Compendium.pf2e.equipment-srd.Item.z8nKK4rSUGQVT2t9",
    truddsStrength: "Compendium.pf2e.equipment-srd.Item.I8XecIUYhwagAnXv",
    unholy: "Compendium.pf2e.equipment-srd.Item.gmMrJREf4JSHd2dZ",
    vorpal: "Compendium.pf2e.equipment-srd.Item.6xaxxKfvXED6LfIY",
    winged: "Compendium.pf2e.equipment-srd.Item.ds7j3D8IIyxWd2XI",
};

const SPECIFIC_ACTION_RUNE_ACTIVATIONS = ["conducting"];

const RUNE_RULE_ELEMENTS = {
    assisting: [
        { key: "ActiveEffectLike", mode: "add", path: "inventory.bulk.encumberedAfterAddend", value: 1 },
        { key: "ActiveEffectLike", mode: "add", path: "inventory.bulk.maxAddend", value: 1 },
    ],
    slick: makeFlatModifier("acrobatics", 1, [{ or: ["action:escape", "action:squeeze"] }]),
    greaterSlick: makeFlatModifier("acrobatics", 2, [{ or: ["action:escape", "action:squeeze"] }]),
    majorSlick: makeFlatModifier("acrobatics", 3, [{ or: ["action:escape", "action:squeeze"] }]),
    shadow: makeFlatModifier("stealth", 1),
    greaterShadow: makeFlatModifier("stealth", 2),
    majorShadow: makeFlatModifier("stealth", 3),
    sinisterKnight: makeFlatModifier("deception", 3),
    stanching: makeFlatCheckAlteration("bleed", 12),
    greaterStanching: makeFlatCheckAlteration("bleed", 10),
    majorStanching: makeFlatCheckAlteration("bleed", 8),
    trueStanching: [...makeFlatCheckAlteration("acid", 5), ...makeFlatCheckAlteration("fire", 5)],
    quenching: [...makeFlatCheckAlteration("acid", 12), ...makeFlatCheckAlteration("fire", 12)],
    greaterQuenching: [...makeFlatCheckAlteration("acid", 10), ...makeFlatCheckAlteration("fire", 10)],
    majorQuenching: [...makeFlatCheckAlteration("acid", 8), ...makeFlatCheckAlteration("fire", 8)],
    trueQuenching: [...makeFlatCheckAlteration("acid", 5), ...makeFlatCheckAlteration("fire", 5)],
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
    bolkasBlessing: [
        makeFlatModifier("diplomacy", 1),
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["action:sense-motive"],
            selector: "perception",
            slug: "bolkasBlessing",
            type: "item",
            value: 1,
        },
    ],
    greaterBolkasBlessing: [
        makeFlatModifier("diplomacy", 2),
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["action:sense-motive"],
            selector: "perception",
            slug: "bolkasBlessing",
            type: "item",
            value: 2,
        },
    ],
    kolssOath: [
        makeFlatModifier("society", 1),
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["action:request"],
            selector: "diplomacy",
            slug: "kolssOath",
            type: "item",
            value: 1,
        },
    ],
    greaterKolssOath: [
        makeFlatModifier("society", 2),
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["action:request"],
            selector: "diplomacy",
            slug: "kolssOath",
            type: "item",
            value: 2,
        },
    ],
    truddsStrength: [
        makeFlatModifier("athletics", 1),
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["action:coerce"],
            selector: "intimidation",
            slug: "truddsStrength",
            type: "item",
            value: 1,
        },
    ],
    greaterTruddsStrength: [
        makeFlatModifier("athletics", 2),
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["action:coerce"],
            selector: "intimidation",
            slug: "greaterTruddsStrength",
            type: "item",
            value: 2,
        },
    ],
    antimagic: [
        {
            key: "FlatModifier",
            label: "{item|name}",
            predicate: ["magical"],
            selector: "saving-throw",
            slug: "antimagic",
            type: "status",
            value: 1,
        },
    ],
    acidResistant: makeResistance("acid", 5),
    coldResistant: makeResistance("cold", 5),
    electricityResistant: makeResistance("electricity", 5),
    fireResistant: makeResistance("fire", 5),
    greaterAcidResistant: makeResistance("acid", 10),
    greaterColdResistant: makeResistance("cold", 10),
    greaterElectricityResistant: makeResistance("electricity", 10),
    greaterFireResistant: makeResistance("fire", 10),
    bane: [
        {
            key: "ChoiceSet",
            choices: [
                { label: "PF2E.TraitAberration", value: "target:trait:aberration" },
                { label: "PF2E.TraitAnimal", value: "target:trait:animal" },
                { label: "PF2E.TraitBeast", value: "target:trait:beast" },
                { label: "PF2E.TraitCelestial", value: "target:trait:celestial" },
                { label: "PF2E.TraitConstruct", value: "target:trait:construct" },
                { label: "PF2E.TraitDragon", value: "target:trait:dragon" },
                { label: "PF2E.TraitElemental", value: "target:trait:elemental" },
                { label: "PF2E.TraitFey", value: "target:trait:fey" },
                { label: "PF2E.TraitFiend", value: "target:trait:fiend" },
                { label: "PF2E.TraitGiant", value: "target:trait:giant" },
                { label: "PF2E.TraitMonitor", value: "target:trait:monitor" },
                { label: "PF2E.TraitOoze", value: "target:trait:ooze" },
                { label: "PF2E.TraitPlant", value: "target:trait:plant" },
                { label: "PF2E.TraitFungus", value: "target:trait:fungus" },
            ],
            flag: "bane",
        },
        {
            key: "DamageDice",
            selector: "{item|id}-damage",
            diceNumber: 1,
            dieSize: "d6",
            predicate: ["{item|flags.pf2e.rulesSelections.bane}"],
            label: "Bane",
        },
    ],
};

const ACTIVATIONS_LIST = Object.keys(RUNE_ACTIVATIONS);

export const RULE_ELEMENT_LIST = Object.keys(RUNE_RULE_ELEMENTS);

export const RELEVANT_PROPERTY_RUNE_LIST = [...ACTIVATIONS_LIST, ...RULE_ELEMENT_LIST];

function filterRelevantRunes(runes, list) {
    return Array.isArray(runes) ? runes.filter((r) => list.includes(r)) : [];
}

export function getRelevantPropertyRunes(item) {
    const runes = item?.system?.runes?.property ?? [];
    return {
        rule_elements: filterRelevantRunes(runes, RULE_ELEMENT_LIST).flatMap((r) =>
            getREsForARune(r).map((re) => ({ ...re, flags: { grantedBy: { uuid: item.uuid }, rune: r } }))
        ),
        activations: filterRelevantRunes(runes, ACTIVATIONS_LIST),
    };
}

async function generateActivationForARune(item, runeUUID) {
    const rune = await fromUuid(runeUUID);
    return generateActivations(rune).map((act) => augmentAction(act, item));
}

function getREsForARune(runeShortName) {
    return RUNE_RULE_ELEMENTS?.[runeShortName] ?? [];
}

export async function handlePropertyRunes(item) {
    const runes = item?.system?.runes?.property;
    if (!runes?.some((r) => RELEVANT_PROPERTY_RUNE_LIST.includes(r))) return;

    const { rule_elements, activations } = getRelevantPropertyRunes(item);

    const activationPromises = activations.map((rune) => {
        if (SPECIFIC_ACTION_RUNE_ACTIVATIONS.includes(rune)) {
            return fromUuid(RUNE_ACTIVATIONS[rune]).then((act) => ({
                ...setModuleFlag(augmentAction(act, item), "rune", rune),
                sourceId: RUNE_ACTIVATIONS[rune],
            }));
        } else {
            return generateActivationForARune(item, RUNE_ACTIVATIONS[rune]).then((acts) =>
                acts.map((act) => ({ ...setModuleFlag(act, "rune", rune), sourceId: RUNE_ACTIVATIONS[rune] }))
            );
        }
    });
    const final_activations = (await Promise.all(activationPromises)).flat();

    return { actives: final_activations, rules: rule_elements };
}

export function getRelevantRunesRemoved(changed_runes, current_runes) {
    const relevantChanged = filterRelevantRunes(changed_runes, RELEVANT_PROPERTY_RUNE_LIST);
    return filterRelevantRunes(current_runes, RELEVANT_PROPERTY_RUNE_LIST).filter((r) => !relevantChanged.includes(r));
}

/**
 *
 * @param {*} item
 * @param {string[]} runes Rune IDs
 * @returns
 */
export async function handleRemovedRunes(item, runes) {
    const actor = item?.actor;
    if (!actor) return;

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
                system: { rules: (item.system.rules ?? []).filter((r) => !runes.includes(r?.flags?.rune)) },
            },
        ]);
    }
}

export function getRelevantRunesAdded(changed_runes, current_runes) {
    const relevantCurrent = filterRelevantRunes(current_runes, RELEVANT_PROPERTY_RUNE_LIST);
    return filterRelevantRunes(changed_runes, RELEVANT_PROPERTY_RUNE_LIST).filter((r) => !relevantCurrent.includes(r));
}

export async function handleAddedRunes(item, runes) {
    const actor = item?.actor;
    if (!actor) return;
    item.system.runes.property = runes;

    const { actives = [], rules = [] } = (await handlePropertyRunes(item)) || {};
    if (actives.length) {
        await actor.createEmbeddedDocuments("Item", actives);
    }
    if (rules.length) {
        await actor.updateEmbeddedDocuments("Item", [
            {
                _id: item.id,
                system: { rules: [...item.system.rules, ...rules] },
            },
        ]);
    }
}
