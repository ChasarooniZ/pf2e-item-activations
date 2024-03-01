export function marker() {
    return '[X]';
}

export function activateAction(action) {
    action.name = marker().concat(' ', action.name)
    return action;
}

export function deactivateAction(action) {
    action.name = action.name.replaceAll(marker(), '').trim();
    return action;
}