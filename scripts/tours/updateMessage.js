import { MODULE_ID } from "../helpers/misc.js";
import { EnhancedTour } from "../library/EnhancedTour.js";
import { TOUR_LIST, TOURS, TOUR_BASICS } from "./tour-setup.js";

export function sendUpdateMessage() {
    let pastVersion = "0.0.0";
    const version = game.modules.get(MODULE_ID).version;
    try {
        pastVersion = game.settings.get(MODULE_ID, "last-version");
    } catch (e) {}
    const toursToRun = getNewTourList(splitVersions(version), splitVersions(pastVersion));
    game.settings.set(MODULE_ID, "last-version", version);
    runTour(toursToRun);
}

function getNewTourList(pastVersion, version) {
    const [pastMajor, pastMinor, pastPatch] = pastVersion;
    //TODO const [verMajor, verMinor, verPatch] = version;
    return TOUR_LIST.map(splitVersions)
        .filter((item) => {
            if (item === pastVersion || item === version) return false;
            const [itemMajor, itemMinor, itemPatch] = item;
            return (
                itemMajor > pastMajor ||
                (itemMajor === pastMajor && itemMinor > pastMinor) ||
                (itemMajor === pastMajor && itemMinor === pastMinor && itemPatch > pastPatch)
            );
        })
        .map((it) => it.join("."));
}

function splitVersions(version) {
    let items = version.split(".");
    return [items[0], items[1], ...items[2].split("-")];
}

async function runTour(tourStepsArray) {
    let tourData = TOUR_BASICS;
    tourStepsArray.forEach((t) => (tourData.steps = tourData.steps.concat(TOURS[t])));
    const tour = new EnhancedTour(tourData);
    await tour.reset();
    await tour.start();
}
