import { MODULE_ID } from "./misc.js";


export function debugLog(data, context = "") {
    if (game.settings.get(MODULE_ID, "debug-mode"))
        console.log(`PF2E-ITEM-ACTIVATIONS: ${context}`, data);
}
