// Defaults to 1 / day
// Defaults to default spell rank
// If array then its pick one
// strictDC = dc must be the value set
const ITEMS = {
    SPELLHEART: {
        "flaming-star": {
            dc: 17,
            spells: [SPELLS.IGNITION],
        },
        "flaming-star-greater": {
            dc: 24,
            spells: [SPELLS.IGNITION, SPELLS.FIREBALL],
        },
        "flaming-star-major": {
            dc: 29,
            spells: [SPELLS.IGNITION, { rank: 4, uuid: SPELLS.FIREBALL }, SPELLS.WALL_OF_FIRE],
        },
        "grim-sandglass": {
            dc: 17,
            spells: [SPELLS.VOID_WARP],
        },
        "grim-sandglass-greater": {
            dc: 24,
            spells: [
                SPELLS.VOID_WARP,
                [
                    { rank: 2, uuid: SPELLS.HEAL },
                    { rank: 2, uuid: SPELLS.HARM },
                ],
            ],
        },
        "grim-sandglass-major": {
            dc: 29,
            spells: [
                SPELLS.VOID_WARP,
                [
                    { rank: 4, uuid: SPELLS.HEAL },
                    { rank: 4, uuid: SPELLS.HARM },
                ],
                [SPELLS.ENERVATION, { rank: 4, uuid: SPELLS.RESTORATION }],
            ],
        },
    },
};

const SPELLS = {
    ENERVATION: "Compendium.pf2e.spells-srd.Item.eexkxcqnkXazsGfK",
    FIREBALL: "Compendium.pf2e.spells-srd.Item.sxQZ6yqTn0czJxVd",
    HARM: "Compendium.pf2e.spells-srd.Item.wdA52JJnsuQWeyqz",
    HEAL: "Compendium.pf2e.spells-srd.Item.rfZpqmj0AIIdkVIs",
    IGNITION: "Compendium.pf2e.spells-srd.Item.6DfLZBl8wKIV03Iq",
    RESTORATION: "Compendium.pf2e.spells-srd.Item.SnaLVgxZ9ryUFmUr",
    WALL_OF_FIRE: "Compendium.pf2e.spells-srd.Item.IarZrgCeaiUqOuRu",
    VOID_WARP: "Compendium.pf2e.spells-srd.Item.mAMEt4FFbdqoRnkN",
};
