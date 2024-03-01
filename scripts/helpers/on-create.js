export function augmentAction(action, item) {
    const resultAction = action;
    resultAction.system.description.value = `<p>Granted by ${item.link}</p>`.concat(action.system.description.value)
    resultAction.grantedBy = item;
    return resultAction
}