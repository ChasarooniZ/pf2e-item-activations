import { MODULE_ID } from "./helpers/misc.js";
import { EnhancedTour } from "./library/EnhancedTour.js";

export function registerAPI() {
    game.PF2eItemActivations = foundry.utils.mergeObject(game.PF2eItemActivations ?? {}, {
        createTour: createTour,
        createTourFromJSON: createTourFromJSON,
        registerTour: registerTour,
    });
}

function createTour(data) {
    return new EnhancedTour(data);
}
async function createTourFromJSON(jsonPath) {
    return EnhancedTour.fromJSON(jsonPath);
}
function registerTour(tour) {
    game.tours.register(MODULE_ID, tour.id, tour);
}
