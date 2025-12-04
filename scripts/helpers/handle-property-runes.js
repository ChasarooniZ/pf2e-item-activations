import {
    ACTIVATIONS_LIST,
    DYNAMIC_RUNE_RULE_ELEMENTS,
    RELEVANT_PROPERTY_RUNE_LIST,
    RULE_ELEMENT_LIST,
    RUNE_ACTIVATIONS,
    RUNE_RULE_ELEMENTS,
    SPECIFIC_ACTION_RUNE_ACTIVATIONS,
} from "./const.js";
import { generateActivations } from "./generate-activation.js";
import { setModuleFlag } from "./misc.js";
import { MODULE_ID } from "./const.js";
import { augmentAction } from "./on-create.js";

function filterRelevantRunes(runes, list) {
    return Array.isArray(runes) ? runes.filter((r) => list.includes(r)) : [];
}

export function getRelevantPropertyRunes(item) {
    const runes = item?.system?.runes?.property ?? [];
    return {
        rule_elements: filterRelevantRunes(runes, RULE_ELEMENT_LIST).flatMap((r) =>
            getREsForARune(r, item).map((re) => ({ ...re, flags: { grantedBy: { uuid: item.uuid }, rune: r } }))
        ),
        activations: filterRelevantRunes(runes, ACTIVATIONS_LIST),
    };
}

async function generateActivationForARune(item, runeUUID) {
    const rune = await fromUuid(runeUUID);
    return generateActivations(rune).map((act) => augmentAction(act, item));
}

function getREsForARune(runeShortName, item) {
    return (
        (DYNAMIC_RUNE_RULE_ELEMENTS.has(runeShortName)
            ? RUNE_RULE_ELEMENTS?.[runeShortName](item)
            : RUNE_RULE_ELEMENTS?.[runeShortName]) ?? []
    );
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
