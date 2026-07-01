import { MODULE_ID } from "./const.js";

export function showItemActivationsList(item, html) {
    const actor = item?.actor;
    if (actor) {
        const relevantSection = html.find("div.inventory-details");
        const htmlLocation = relevantSection?.[0];
        if (htmlLocation) {
            const id = item?.id;
            const activations = actor.items.contents.filter((it) => it?.flags?.[MODULE_ID]?.grantedBy?._id === id);
            if (activations?.length > 0) {
                let finalHTML = `<h4>${game.i18n.localize("pf2e-item-activations.ui.activations")}</h4>`;
                for (const activation of activations) {
                    const usageHTML = activation.system?.frequency
                        ? `${game.i18n.format("pf2e-item-activations.ui.frequency-status", activation.system?.frequency)}<hr>`
                        : "";
                    finalHTML += `<div class="activation-list-item" id="${activation.id}"
                    data-tooltip-direction="LEFT"
                    data-tooltip="${usageHTML}<b>${game.i18n.localize("pf2e-item-activations.ui.open-activation")}:</b> <span
                        class='reference'>${game.i18n.localize("CONTROLS.LeftClick")}" data-action="open-image">
                    <a class="item-image pf2e-item-activation-link framed"  draggable="false">
                        <img class="item-icon" src="${activation.img}" alt="${activation.name}" draggable="false">
                    </a>
                    <a>${activation.name}</a>
                 </div>`;
                }
                htmlLocation.insertAdjacentHTML("beforeend", finalHTML);
                htmlLocation.querySelectorAll("div.activation-list-item").forEach((activationHTML) => {
                    activationHTML.addEventListener("click", function (e) {
                        const id = this?.id;
                        const item = actor.items?.get(id);
                        if (id && item) {
                            item.sheet.render(true);
                        }
                    });
                });
            }
        }
    }
}
