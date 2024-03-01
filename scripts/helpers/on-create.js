export function augmentAction(action, item) {
    action.system.description.value = `<p>Granted by ${item.link}</p>`.concat(action.system.description.value)
    action.flags.pf2eItemActivations.source = item;
    return action
}