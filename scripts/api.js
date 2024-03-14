import { MODULE_ID } from "./helpers/misc.js";
import { EnhancedTour } from "./library/EnhancedTour.js";

export class PF2eItemActivations {
    constructor() {
        console.log("API Registered")   
    }
    createTour(data) {
        return new EnhancedTour(data);
    }
    async createTourFromJSON(jsonPath) {
        return EnhancedTour.fromJSON(jsonPath);
    }
    registerTour(tour) {
        game.tours.register(MODULE_ID, tour.id, tour);
    }

}
