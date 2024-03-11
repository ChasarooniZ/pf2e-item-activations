export function hasActivations(item) {
    return item.system.description.value.includes('<p><strong>Activate');
}

export function generateActivations(item) {
    const description = item.system.description.value;
    const isRemaster = description.includes('<p><strong>Activate—');
    let result = description.split('<p><strong>Activate').slice(1) ?? [];
    result = result.map((descAction, num) => {
        const actionType = getActionInfo(descAction.split('<span class="action-glyph">')[1]?.split('</span>')[0]);
        const action = {
            img: item.img,
            type: "ability",
            system: {
                description: {
                    value: '<p><strong>Activate' + descAction.substring(descAction)
                },
                traits: {
                    value: []
                },
                actions: {
                    value: actionType.cnt
                },
                actionType: {
                    value: actionType.type
                }
            }
        }
        if (descAction.includes('<strong>Frequency</strong> '))
            action.system.frequency = getFrequency(descAction.split('<strong>Frequency</strong> ')[1]?.split('</p>')[0])
        if (isRemaster) {
            action.name = `Activation: ${descAction.split("</strong>")[0].replace('—', '')}`;
            action.system.traits.value = descAction.match(/\(([^)]+)\)/g)[0].slice(1, -1).split(",");
        } else {
            action.name = `Activation: ${item.name}${result.length > 1 ? `(#${num + 1})` : ''}`;
            action.system.traits.value = getOldActionTraits(getOldActionTraitString(descAction));
        }
        action.slug = game.pf2e?.system?.sluggify(action.name)
        return action;
    })
    return result;
}

function getActionInfo(type) {
    switch (type) {
        case '1':
            return { type: 'action', cnt: 1 }
        case '2':
            return { type: 'action', cnt: 2 }
        case '3':
            return { type: 'action', cnt: 3 }
        case 'R':
            return { type: 'reaction', cnt: null }
        case 'F':
            return { type: 'free', cnt: null }
        default:
            return { type: 'passive', cnt: null }
    }
}

function getOldActionTraitString(desc) {
    let str = desc.split("</p>")[0];
    if (str.includes(`<span class="action-glyph">`)) {
        str = str.split('</span>')[1].trim();
    } else {
        str = str.toLowerCase();
        str = str.subString(
            Math.min(
                Math.max(str.indexOf('command'), 9999),
                Math.max(str.indexOf('envision'), 9999),
                Math.max(str.indexOf('interact'), 9999),
            )
        )
    }
    return str.trim();
}

function getOldActionTraits(string) {
    let traits = [];
    if (string.includes("(")) {
        traits = string.match(/\(([^)]+)\)/g)[0].slice(1, -1).split(",");
        string = string.split("(")[0].trim();
    }
    string.split(",").forEach((t) => {
        traits = traits.concat(getNewTraits(t.trim()))
    })
    return [...new Set(traits)];
}

function getNewTraits(activ) {
    switch (activ) {
        case 'command':
            return ['auditory', 'concentrate']
        case 'envision':
            return ['concentrate']
        case 'interact':
            return ['manipulate']
        default:
            return [activ]
    }
}

function getFrequency(str) {
    const [amt, unit] = [
        str.split(" ")[0],
        str.substring(str.split(" ")[0].length + 1).replace("per", "").trim()
    ]
    const re = {
        max: 1,
        per: "day"
    }
    switch (amt.toLowerCase()) {
        case "once":
            re.max = 1;
            break;
        default:
            if (!isNaN(amt))
                re.max = parseInt(amt)
    }
    switch (unit.toLowerCase()) {
        case "turn":
            re.per = "turn";
            break;
        case "round":
            re.per = "round";
            break;
        case "minute":
            re.per = "PT1M";
            break;
        case "10 minutes":
            re.per = "PT10M";
            break;
        case "hour":
            re.per = "PT1H";
            break;
        case "24 hours":
            re.per = "PT24H";
            break;
        case "day":
            re.per = "day";
            break;
        case "week":
            re.per = "P1W";
            break;
        case "month":
            re.per = "PT1M";
            break;
        case "year":
            re.per = "P1Y";
            break;
        default:
    }
    return re;
}