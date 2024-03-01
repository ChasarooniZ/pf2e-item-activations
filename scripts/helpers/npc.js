import { isChangeImportant } from "../module.js";

export function checkChangeTypeNPC(itemEquipmentStatus, changesToEquipment, usageConditions) {
    const combinedStatus = Object.assign(itemEquipmentStatus, changesToEquipment)
    const qualified = isQualifiedNPC(combinedStatus, usageConditions);
    const importantChange = isChangeImportant(changesToEquipment, usageConditions);
    //TODO Improve the checking on this to help with performance
    if (!importantChange) {
        return 'None'
    } else if (importantChange && !qualified) {
        return 'Off'
    } else if (importantChange && qualified) {
        return 'On'
    }
}

export function isQualifiedNPC(itemEquipmentStatus, usageConditions) {
    if (usageConditions.handsHeld > itemEquipmentStatus.handsHeld) {
        return false;
    }

    if (usageConditions.carryType === 'held') {
        if (itemEquipmentStatus.carryType !== 'held') {
            return false;
        }
    } else if (itemEquipmentStatus.carryType !== 'worn') {
        return false;
    }
    return true;
}