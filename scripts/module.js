// import {generateDamageScroll, extractDamageInfoCombined, getTargetList} from './utility.js'
// HOOKS STUFF
Hooks.on("ready", async () => {
    //console.error("PF2e RPG Numbers is ready");
    if (!game.user.isGM) return;
    ui.notifications.info("PF2e Item Activations")
    //game.RPGNumbers = new RPGNumbers();
    Hooks.on("updateItem", async function (item, changes, diff, id) {
        console.log(`PF2E-ITEM-ACTIVATIONS:`, item, changes, diff);
    //     console.log({ enable: game.settings.get("pf2e-item-activations", 'enabled'), debug: game.settings.get("pf2e-item-activations", 'debug-mode') })
    //     if (!game.settings.get("pf2e-item-activations", 'enabled')) return;
    //     if (game.user.isGM) {
    //         debugLog({
    //             item
    //         }, "Item")
    //         
    //         debugLog({ actions, isProperlyEquipped, isInvestProper }, "RemoveOrAdd");
    //         removeOrAddActions(item.actor, actions, isProperlyEquipped && isInvestProper);
    //     }
    })
});

export function checkIfImportantUpdate(item) {
    let actions = item.rules.filter((rule) => rule.key === "GrantItem").map(rule => rule.uuid);
    if (actions.length === 0) return;
    const isInvestProper = item.system.traits.value.includes("invested") === !!item.isInvested;
    let isProperlyEquipped = false;
    if (item.system.usage.value === "held-in-one-hand") {
        isProperlyEquipped = item.isHeld;
    } else if (item.system.usage.type === "worn") {
        isProperlyEquipped = item.isWorn;
    }
    return isProperlyEquipped && isProperlyInvested;
}

export function removeOrAddActions(actor, itemIds, isAdd = true) {
    const actions = [];
    for (uuid in itemIds) {
        let action = await fromUuid(uuid);
        actions.push(action.toObject());
    }
    if (isAdd) {
        actor.createEmbeddedDocuments("Item", actions);
    } else {
        const actionSlugs = actions.map(action => action.slug);
        actor.deleteEmbeddedDocuments("Item", actor.items.filter(item => actionSlugs.includes(item.slug)).map(item => item.slug));
    }
}

export function debugLog(data, context = "") {
    if (game.settings.get("pf2e-item-activations", 'debug-mode'))
        console.log(`PF2E-ITEM-ACTIVATIONs: ${context}`, data);
}