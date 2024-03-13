import { isChangeImportant } from "../module.js";

/**
 * Check change type ('On', 'Off' or 'None')
 * @param {carryType?: string, handsHeld?: number, invested?: boolean, inSlot?: boolean} itemEquipmentStatus Item to check
 * @param {carryType?: string, handsHeld?: number, invested?: boolean, inSlot?: boolean} changes Changes made to item
 * @param {carryType?: string, handsHeld?: number, invested?: boolean, inSlot?: boolean} usageConditions usage type
 */
export function checkChangeTypePC(itemEquipmentStatus, changesToEquipment, usageConditions) {
    const combinedStatus = Object.assign(itemEquipmentStatus, changesToEquipment);
    const qualified = isQualifiedPC(combinedStatus, usageConditions);
    const importantChange = isChangeImportant(changesToEquipment, usageConditions);
    //TODO Improve the checking on this to help with performance
    if (!importantChange) {
        return "None";
    } else if (importantChange && !qualified) {
        return "Off";
    } else if (importantChange && qualified) {
        return "On";
    }
}

export function isQualifiedPC(itemEquipmentStatus, usageConditions) {
    if (usageConditions.invested && !itemEquipmentStatus?.invested) {
        return false;
    }
    if (usageConditions.handsHeld > itemEquipmentStatus.handsHeld) {
        return false;
    }
    if (usageConditions.inSlot && !itemEquipmentStatus.inSlot) {
        return false;
    }
    return usageConditions.carryType === itemEquipmentStatus.carryType;
}
