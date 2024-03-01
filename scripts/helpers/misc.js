import { ITEM_LIST } from "./item-list";

export function indexSlugs() {
    const index = game.packs.get("pf2e-item-activations.item-activations").index;
    for (let item in ITEM_LISTT) {
        ITEM_LIST[item].slugs = ITEM_LIST[item].actions.map(uuid =>
            game?.pf2e?.system?.sluggify(index.get(uuid.split('.').slice(-1)[0]).name)
        );
    }
}