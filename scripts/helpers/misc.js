import { ITEM_LIST } from "./item-list.js";

export const MODULE_ID = 'pf2e-item-activations';

export function indexSlugs() {
    const index = game.packs.get("pf2e-item-activations.item-activations").index;
    for (let item in ITEM_LIST) {
        ITEM_LIST[item].slugs = ITEM_LIST[item].actions.map(uuid =>
            game.pf2e?.system?.sluggify(index.get(uuid.split('.').slice(-1)[0]).name)
        );
    }
}

export function setModuleFlag(item, flagName, value) {
    if (!item?.flags?.[MODULE_ID])
        item.flags[MODULE_ID] = {};
    item.flags[MODULE_ID][flagName] = value;
    return item;
}