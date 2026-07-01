import { MODULE_ID } from "./const.js";

export function actionStyling(actor, html) {
    const items = actor.items.contents;

    const disabledActionsIDs = getActions({ items, enabled: false });
    const enabledActionsIDs = getActions({ items, enabled: true });

    disabledActionsIDs.forEach((id) => {
        styleAction({ id, html, enabled: false });
    });
    enabledActionsIDs.forEach((id) => {
        styleAction({ id, html, enabled: true });
    });
}

function getActions({ items, enabled }) {
    return items.filter((it) => it?.flags?.[MODULE_ID]?.enabled === enabled).map((i) => i.id);
}

function styleAction({ id, html, enabled }) {
    const item = html.find(`[data-item-id='${id}']`);
    if (!item) return;
    item.addClass(enabled ? "enabled-activation" : "disabled-activation");
}
