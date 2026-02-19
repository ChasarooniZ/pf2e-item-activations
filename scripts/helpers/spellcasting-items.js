// Defaults to 1 / day
// Only handles per day spells
// {uses: 2} is for multiple uses
// Defaults to default spell rank
// If array then its pick one
// strictDC = dc must be the value set
export const SPELL_ITEMS = {
    "flaming-star": {
        dc: 17,
        spells: [SPELLS.IGNITION],
        notes: getSpellHeartNotes("flaming-star"),
    },
    "flaming-star-greater": {
        dc: 24,
        spells: [SPELLS.IGNITION, SPELLS.FIREBALL],
        notes: getSpellHeartNotes("flaming-star"),
    },
    "flaming-star-major": {
        dc: 29,
        spells: [SPELLS.IGNITION, { rank: 4, uuid: SPELLS.FIREBALL }, SPELLS.WALL_OF_FIRE],
        notes: getSpellHeartNotes("flaming-star"),
    },
    "grim-sandglass": {
        dc: 17,
        spells: [SPELLS.VOID_WARP],
        notes: getSpellHeartNotes("grim-sandglass"),
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
        notes: getSpellHeartNotes("grim-sandglass"),
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
        notes: getSpellHeartNotes("grim-sandglass"),
    },
    "jolt-coil": {
        dc: 17,
        spells: [SPELLS.ELECTRIC_ARC],
        notes: getSpellHeartNotes("jolt-coil"),
    },
    "jolt-coil-greater": {
        dc: 24,
        spells: [SPELLS.ELECTRIC_ARC, SPELLS.LIGHTNING_BOLT],
        notes: getSpellHeartNotes("jolt-coil"),
    },
    "jolt-coil-major": {
        dc: 29,
        spells: [SPELLS.ELECTRIC_ARC, { rank: 4, uuid: SPELLS.LIGHTNING_BOLT }, SPELLS.DRAW_THE_LIGHTNING],
        notes: getSpellHeartNotes("jolt-coil"),
    },
    "perfect-droplet": {
        dc: 17,
        spells: [SPELLS.SPOUT],
        notes: getSpellHeartNotes("perfect-droplet"),
    },
    "perfect-droplet-greater": {
        dc: 24,
        spells: [
            SPELLS.SPOUT,
            [
                SPELLS.AQUEOUS_ORB,
                SPELLS.FEET_TO_FINS,
            ],
        ],
        notes: getSpellHeartNotes("perfect-droplet"),
    },
    "perfect-droplet-major": {
        dc: 29,
        spells: [
            SPELLS.SPOUT,
            [
                { rank: 4, uuid: SPELLS.AQUEOUS_ORB },
                { rank: 4, uuid: SPELLS.FEET_TO_FINS },
            ],
            SPELLS.HYDRAULIC_TORRENT,
        ],
        notes: getSpellHeartNotes("perfect-droplet"),
    },
};

const SPELLHEART_EFFECTS = {
    "grim-sandglass": {
        weapon: "Compendium.pf2e.equipment-effects.Item.V4JoVnOfKze8cRan",
    },
    "flaming-star": {
        weapon: "Compendium.pf2e.equipment-effects.Item.OxCVZSvWVJsOGAZN",
    },
    "jolt-coil": {
        weapon: "Compendium.pf2e.equipment-effects.Item.mHIdEC7RX6isILiM",
    },
    "perfect-droplet": {
        armor: "Compendium.pf2e.equipment-effects.Item.VZCcjwsQX1wnYlTn",
    },
};

export const SPELL_ITEM_SLUG_LIST = [...Object.keys(SPELL_ITEMS)];

function getSpellHeartNotes(id) {
    const keys = Object.keys(game.i18n.translations?.["pf2e-item-activations"]?.notes?.spellhearts?.items?.[id]);
    return [
        {
            key: "RollOption",
            label: "{item|name}",
            option: "{item|slug}",
            placement: "spellcasting",
            toggleable: true,
            suboptions: [
                { label: "pf2e-item-activations.notes.spellhearts.terms.weapon", value: "weapon" },
                { label: "pf2e-item-activations.notes.spellhearts.terms.armor", value: "armor" },
            ],
            alwaysActive: true,
            value: true,
        },
        ...(keys.includes("armor")
            ? [
                  {
                      itemType: "spell",
                      key: "ItemAlteration",
                      mode: "add",
                      predicate: ["{item|slug}:armor"],
                      property: "description",
                      value: [
                          {
                              text: `<p>@Localize[pf2e-item-activations.notes.spellhearts.items.${id}.armor]</p>${SPELLHEART_EFFECTS?.[id]?.armor ? `@UUID[${SPELLHEART_EFFECTS?.[id]?.armor}]` : ""}`,
                              title: "pf2e-item-activations.notes.spellhearts.terms.armor",
                          },
                      ],
                  },
              ]
            : []),
        ...(keys.includes("weapon")
            ? [
                  {
                      itemType: "spell",
                      key: "ItemAlteration",
                      mode: "add",
                      predicate: ["{item|slug}:weapon"],
                      property: "description",
                      value: [
                          {
                              text: `<p>@Localize[pf2e-item-activations.notes.spellhearts.items.${id}.weapon]</p>${SPELLHEART_EFFECTS?.[id]?.weapon ? `@UUID[${SPELLHEART_EFFECTS?.[id]?.weapon}]` : ""}`,
                              title: "pf2e-item-activations.notes.spellhearts.terms.weapon",
                          },
                      ],
                  },
              ]
            : []),
    ];
}

const SPELLS = {
    AQUEOUS_ORB: "Compendium.pf2e.spells-srd.Item.oUDNCArkQTdhllxD",
    DRAW_THE_LIGHTNING: "Compendium.pf2e.spells-srd.Item.n7OgbKme4hNwxVwQ",
    ELECTRIC_ARC: "Compendium.pf2e.spells-srd.Item.kBhaPuzLUSwS6vVf",
    ENERVATION: "Compendium.pf2e.spells-srd.Item.eexkxcqnkXazsGfK",
    FEET_TO_FINS: "Compendium.pf2e.spells-srd.Item.RvBlSIJmxiqfCpR9",
    FIREBALL: "Compendium.pf2e.spells-srd.Item.sxQZ6yqTn0czJxVd",
    HARM: "Compendium.pf2e.spells-srd.Item.wdA52JJnsuQWeyqz",
    HEAL: "Compendium.pf2e.spells-srd.Item.rfZpqmj0AIIdkVIs",
    HYDRAULIC_TORRENT: "Compendium.pf2e.spells-srd.Item.Y3G6Y6EDgCY0s3fq",
    IGNITION: "Compendium.pf2e.spells-srd.Item.6DfLZBl8wKIV03Iq",
    LIGHTNING_BOLT: "Compendium.pf2e.spells-srd.Item.9AAkVUCwF6WVNNY2",
    RESTORATION: "Compendium.pf2e.spells-srd.Item.SnaLVgxZ9ryUFmUr",
    SPOUT: "Compendium.pf2e.spells-srd.Item.eSL5hVT9gXrnRLtd",
    WALL_OF_FIRE: "Compendium.pf2e.spells-srd.Item.IarZrgCeaiUqOuRu",
    VOID_WARP: "Compendium.pf2e.spells-srd.Item.mAMEt4FFbdqoRnkN",
};
