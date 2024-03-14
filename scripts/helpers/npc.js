import { isChangeImportant } from "../module.js";

export function checkChangeTypeNPC(itemEquipmentStatus, changesToEquipment, usageConditions) {
    const importantChange = isChangeImportant(changesToEquipment, usageConditions);

    if (!importantChange) {
        return "None";
    }

    const combinedStatus = {
        ...itemEquipmentStatus,
        ...changesToEquipment,
    };

    const qualified = isQualifiedNPC(combinedStatus, usageConditions);

    return qualified ? "On" : "Off";
}

export function isQualifiedNPC(itemEquipmentStatus, usageConditions) {
    return (
        usageConditions.handsHeld <= itemEquipmentStatus.handsHeld &&
        ((usageConditions.carryType === "held" && itemEquipmentStatus.carryType === "held") ||
            (usageConditions.carryType !== "held" && itemEquipmentStatus.carryType === "worn"))
    );
}
