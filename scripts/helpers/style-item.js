import { MODULE_ID } from "./misc";

export function actionStyling(actor) {
    const items = actor.items.contents;
    const disabledActionsIDs = getDisabledActions(items);
    styleAllDisabledActions(disabledActionsIDs)
}

function styleAllDisabledActions(ids) {
    ids.forEach(id => {
        styleDisabledAction(id)
    });
}

function styleDisabledAction(id) {
    const item = document.querySelector(`[data-item-id='${id}']`);
    item.style['background-size'] = '40px 40px';
    item.style['background-image'] = 'linear-gradient(45deg, #e3e3e31f 25%, #9999991f 25%, #9999991f 50%, #e3e3e31f 50%, #e3e3e31f 75%, #9999991f 75%, #9999991f 100%)';
}

function getDisabledActions(items) {
    return items.filter(it => !it?.[MODULE_ID]?.enabled).map(i => i.id);
}