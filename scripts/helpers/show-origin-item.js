import { MODULE_ID } from "./const.js";

export function showOriginItem(actor, node) {
    const html = node[0];
    const activationItemInfo = actor.items.contents
        .filter(
            (it) =>
                (it?.flags?.[MODULE_ID]?.enabled === true || it?.flags?.[MODULE_ID]?.enabled === false) &&
                it?.type !== "spell"
        )
        .map((i) => ({
            id: i.id,
            originName: i?.flags?.[MODULE_ID]?.grantedBy?.name,
            originImg: i?.flags?.[MODULE_ID]?.grantedBy?.img,
            originId: i?.flags?.[MODULE_ID]?.grantedBy?._id,
        }));

    activationItemInfo.forEach(({ id, originName, originImg, originId }) => {
        const itemHTML =
            html.querySelector(`.spellcasting-entry[data-item-id='${id}'] .item-name-input`) ||
            html.querySelector(`[data-item-id='${id}'] h4`);
        if (!itemHTML) return;
        itemHTML.insertAdjacentHTML(
            itemHTML.classList.contains("item-name-input") ? "beforebegin" : "afterbegin",
            `<a class="item-image pf2e-item-activation-link framed" id="${originId}" data-tooltip-direction="LEFT" data-tooltip="${game.i18n.localize("pf2e-item-activations.ui.granted-by")} <b>${originName}</b><hr>
                <p><b>${game.i18n.localize("pf2e-item-activations.ui.open-item-source")}:</b> <span class='reference'>${game.i18n.localize(
                    "CONTROLS.LeftClick"
                )}" data-action="open-image" draggable="false">
                <img class="item-icon" src="${originImg}" alt="${originName}" draggable="false">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>`
        );
        (
            itemHTML.querySelector("a.pf2e-item-activation-link") ||
            itemHTML.parentElement.querySelector("a.pf2e-item-activation-link")
        ).addEventListener("click", function (e) {
            const id = this?.id;
            const item = actor.items?.get(id);
            if (id && item) {
                item.sheet.render(true);
            }
        });
    });
}
