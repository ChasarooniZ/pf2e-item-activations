import { TEXT } from "./misc.js";

export function hasActivations(item) {
    return item.system.description.value.includes(`<p><strong>${TEXT.ACTIVATE_TEXT}`);
}

export function generateActivations(item) {
    const description = item.system.description.value;
    const isRemaster = description.includes(`<p><strong>${TEXT.ACTIVATE_TEXT}—`);
    let result = description.split(`<p><strong>${TEXT.ACTIVATE_TEXT}`).slice(1) ?? [];
    result = result.map((descAction, num) => {
        const type = descAction.includes(`<span class="action-glyph">`)
            ? descAction.split(`<span class="action-glyph">`)[1]?.split(`</span>`)[0]
            : descAction.split(`<span class="action-glyph">`)[1]?.split(`<span class="pf2-icon">`)[0];
        const actionType = getActionInfo(type);
        const action = {
            img: item.img,
            type: "action",
            system: {
                description: {
                    value: `<p><strong>${TEXT.ACTIVATE_TEXT}` + descAction.substring(descAction),
                },
                traits: {
                    value: [],
                },
                actions: {
                    value: actionType.cnt,
                },
                actionType: {
                    value: actionType.type,
                },
            },
        };
        if (descAction.includes(`<strong>${TEXT.FREQUENCY_TEXT}</strong> `))
            action.system.frequency = getFrequency(
                descAction.split(`<strong>${TEXT.FREQUENCY_TEXT}</strong> `)[1]?.split(`</p>`)[0]
            );
        if (isRemaster) {
            action.name = `${TEXT.ACTIVATION_TEXT}: ${descAction.split("</strong>")[0].replace("—", "")}`;
            action.system.traits.value = descAction
                .match(/\(([^)]+)\)/g)[0]
                .slice(1, -1)
                .split(",");
        } else {
            action.name = `${TEXT.ACTIVATION_TEXT}: ${item.name}${result.length > 1 ? `(#${num + 1})` : ""}`;
            action.system.traits.value = getOldActionTraits(getOldActionTraitString(descAction));
        }
        action.system.slug = game.pf2e?.system?.sluggify(action.name);
        return action;
    });
    return result;
}

function getActionInfo(type) {
    switch (type.toLowerCase()) {
        case `1`:
        case `a`:
            return { type: `action`, cnt: 1 };
        case `2`:
        case `d`:
            return { type: `action`, cnt: 2 };
        case `3`:
        case `t`:
            return { type: `action`, cnt: 3 };
        case `R`:
            return { type: `reaction`, cnt: null };
        case `F`:
            return { type: `free`, cnt: null };
        default:
            return { type: `passive`, cnt: null };
    }
}

function getOldActionTraitString(desc) {
    let str = desc.split("</p>")[0];
    if (str.includes(`<span class="action-glyph">`) || str.includes(`<span class="pf2-icon">`)) {
        str = str.split(`</span>`)[1].trim();
    } else {
        str = str.toLowerCase();
        str = str.substring(
            Math.min(
                Math.max(str.indexOf(`${TEXT.COMMAND_TEXT}`), 9999),
                Math.max(str.indexOf(`${TEXT.ENVISION_TEXT}`), 9999),
                Math.max(str.indexOf(`${TEXT.INTERACT_TEXT}`), 9999)
            )
        );
    }
    return str.trim();
}

function getOldActionTraits(string) {
    let traits = [];

    // Extract traits enclosed within parentheses
    const parenthesizedTraits = string.match(/\(([^)]+)\)/);
    if (parenthesizedTraits) {
        traits = parenthesizedTraits[1].split(",").map((t) => t.trim());
        string = string.split("(")[0].trim();
    }

    // Split remaining traits by comma and concatenate with existing traits
    string.split(",").forEach((trait) => {
        traits = traits.concat(getNewTraits(trait.trim()));
    });

    // Remove duplicates and return unique traits
    return [...new Set(traits)];
}

function getNewTraits(activationOldTrait) {
    switch (activationOldTrait) {
        case `${TEXT.COMMAND_TEXT}`:
            return [`auditory`, `concentrate`];
        case `${TEXT.ENVISION_TEXT}`:
            return [`concentrate`];
        case `${TEXT.INTERACT_TEXT}`:
            return [`manipulate`];
        default:
            return [activationOldTrait];
    }
}

function getFrequency(str) {
    const [amt, unit] = [
        str.split(" ")[0],
        str
            .substring(str.split(" ")[0].length + 1)
            .replace("per", "")
            .trim(),
    ];
    const re = {
        max: 1,
        per: "day",
    };
    switch (amt.toLowerCase()) {
        case "once":
            re.max = 1;
            break;
        case "twice":
            re.max = 2;
            break;
        default:
            if (!isNaN(amt)) re.max = parseInt(amt);
    }
    switch (unit.toLowerCase()) {
        case `${TEXT.TIME.turn}`:
            re.per = `turn`;
            break;
        case `${TEXT.TIME.round}`:
            re.per = `round`;
            break;
        case `${TEXT.TIME.minute}`:
            re.per = `PT1M`;
            break;
        case `${TEXT.TIME["ten-minutes"]}`:
            re.per = `PT10M`;
            break;
        case `${TEXT.TIME.hour}`:
            re.per = `PT1H`;
            break;
        case `${TEXT.TIME["twenty-four-hours"]}`:
            re.per = `PT24H`;
            break;
        case `${TEXT.TIME.day}`:
            re.per = `day`;
            break;
        case `${TEXT.TIME.week}`:
            re.per = `P1W`;
            break;
        case `${TEXT.TIME.month}`:
            re.per = `PT1M`;
            break;
        case `${TEXT.TIME.year}`:
            re.per = `P1Y`;
            break;
        default:
    }
    return re;
}
