const SPELLS = {
    ACID_GRIP: "Compendium.pf2e.spells-srd.Item.9h9YCncqah6VNsKf",
    ACIDIC_BURST: "Compendium.pf2e.spells-srd.Item.rnNGALRtsjspFTws",
    AQUEOUS_ORB: "Compendium.pf2e.spells-srd.Item.oUDNCArkQTdhllxD",
    CAUSTIC_BLAST: "Compendium.pf2e.spells-srd.Item.thAHF1zxNplLCJPO",
    CHILLING_SPRAY: "Compendium.pf2e.spells-srd.Item.8TQiFzGf4feoHeH0",
    CURSED_METAMORPHOSIS: "Compendium.pf2e.spells-srd.Item.dN8QBNuTiaBHCKUe",
    DAZE: "Compendium.pf2e.spells-srd.Item.4gBIw4IDrSfFHik4",
    DRAW_THE_LIGHTNING: "Compendium.pf2e.spells-srd.Item.n7OgbKme4hNwxVwQ",
    ELECTRIC_ARC: "Compendium.pf2e.spells-srd.Item.kBhaPuzLUSwS6vVf",
    ENERVATION: "Compendium.pf2e.spells-srd.Item.eexkxcqnkXazsGfK",
    ENLARGE: "Compendium.pf2e.spells-srd.Item.wzctak6BxOW8xvFV",
    FEAR: "Compendium.pf2e.spells-srd.Item.4koZzrnMXhhosn0D",
    FEET_TO_FINS: "Compendium.pf2e.spells-srd.Item.RvBlSIJmxiqfCpR9",
    FIREBALL: "Compendium.pf2e.spells-srd.Item.sxQZ6yqTn0czJxVd",
    FROSTBITE: "Compendium.pf2e.spells-srd.Item.IxhGEKl63R4QBvkj",
    GOUGING_CLAW: "Compendium.pf2e.spells-srd.Item.MPxbKoR54gkYkqLO",
    HARM: "Compendium.pf2e.spells-srd.Item.wdA52JJnsuQWeyqz",
    HEAL: "Compendium.pf2e.spells-srd.Item.rfZpqmj0AIIdkVIs",
    HOWLING_BLIZZARD: "Compendium.pf2e.spells-srd.Item.xxWhyl81w3ckslAU",
    HYDRAULIC_TORRENT: "Compendium.pf2e.spells-srd.Item.Y3G6Y6EDgCY0s3fq",
    ICE_STORM: "Compendium.pf2e.spells-srd.Item.kHyjQbibRGPNCixx",
    IGNITION: "Compendium.pf2e.spells-srd.Item.6DfLZBl8wKIV03Iq",
    KNOW_THE_WAY: "Compendium.pf2e.spells-srd.Item.tXa5vOu5giBNCjdR",
    LIGHTNING_BOLT: "Compendium.pf2e.spells-srd.Item.9AAkVUCwF6WVNNY2",
    NOXIOUS_VAPOURS: "Compendium.pf2e.spells-srd.Item.1meVElIu1CEVYWkv",
    ONE_WITH_STONE: "Compendium.pf2e.spells-srd.Item.vh1RpbWfqdNC4L3P",
    OUTCASTS_CURSE: "Compendium.pf2e.spells-srd.Item.KSAEhNfZyXMO7Z7V",
    PETAL_STORM: "Compendium.pf2e.spells-srd.Item.D31YX7zvRBvenTAz",
    PLANT_FORM: "Compendium.pf2e.spells-srd.Item.zCcfPS4y5SrZzU2x",
    PUFF_OF_POISON: "Compendium.pf2e.spells-srd.Item.D7ZEhTNIDWDLC2J4",
    RESTORATION: "Compendium.pf2e.spells-srd.Item.SnaLVgxZ9ryUFmUr",
    SCATTER_SCREE: "Compendium.pf2e.spells-srd.Item.zA0jNIBRgLsyTpbm",
    SPIKE_STONES: "Compendium.pf2e.spells-srd.Item.3xD8DYrr8YDVYGg7",
    SPOUT: "Compendium.pf2e.spells-srd.Item.eSL5hVT9gXrnRLtd",
    WALL_OF_FIRE: "Compendium.pf2e.spells-srd.Item.IarZrgCeaiUqOuRu",
    WALL_OF_THORNS: "Compendium.pf2e.spells-srd.Item.KsWhliKfUs3IpW3c",
    VISION_OF_DEATH: "Compendium.pf2e.spells-srd.Item.Jmxru8zMdYMRuO5n",
    VOID_WARP: "Compendium.pf2e.spells-srd.Item.mAMEt4FFbdqoRnkN",
};

const SPELLHEART_EFFECTS = {
    "clay-sphere": {
        weapon: "Compendium.pf2e.equipment-effects.Item.La2ziyuLYKG0thOj",
    },
    "flaming-star": {
        weapon: "Compendium.pf2e.equipment-effects.Item.OxCVZSvWVJsOGAZN",
    },
    "fox-glove-token": {
        weapon: "",
    },
    "grim-sandglass": {
        weapon: "Compendium.pf2e.equipment-effects.Item.V4JoVnOfKze8cRan",
    },
    "jolt-coil": {
        weapon: "Compendium.pf2e.equipment-effects.Item.mHIdEC7RX6isILiM",
    },
    "perfect-droplet": {
        armor: "Compendium.pf2e.equipment-effects.Item.VZCcjwsQX1wnYlTn",
    },
    "pickled-demon-tongue": {
        weapon: "Compendium.pf2e.equipment-effects.Item.LbaYzs0dQuFj8FXJ",
    },
    "polished-demon-horn": {
        weapon: "Compendium.pf2e.equipment-effects.Item.WARLTi8unmPgmnNw",
    },
    "rime-crystal": {
        weapon: "Compendium.pf2e.equipment-effects.Item.IiDpW99zrh7zHxmQ",
    },
    "trinity-geode": {
        armor: "Compendium.pf2e.equipment-effects.Item.oqwrw6XztVlS9tEG",
        weapon: "Compendium.pf2e.equipment-effects.Item.WRV0XjiEHdlBpduS",
    },
};

// Defaults to 1 / day
// Only handles per day spells
// {uses: 2} is for multiple uses
// Defaults to default spell rank
// If array then its pick one
// strictDC = dc must be the value set
export const SPELL_ITEMS = {
    "clay-sphere": {
        dc: 17,
        spells: [SPELLS.GOUGING_CLAW],
        notes: getSpellHeartNotes("clay-sphere"),
    },
    "clay-sphere-greater": {
        dc: 20,
        spells: [SPELLS.GOUGING_CLAW, SPELLS.ENLARGE],
        notes: getSpellHeartNotes("clay-sphere"),
    },
    "clay-sphere-major": {
        dc: 31,
        spells: [SPELLS.GOUGING_CLAW, SPELLS.CURSED_METAMORPHOSIS, SPELLS.PLANT_FORM],
        notes: getSpellHeartNotes("clay-sphere"),
    },
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
    "foxglove-token": {
        dc: 17,
        spells: [SPELLS.PUFF_OF_POISON],
        notes: getSpellHeartNotes("foxglove-token"),
    },
    "foxglove-token-greater": {
        dc: 24,
        spells: [SPELLS.PUFF_OF_POISON, { rank: 3, uuid: SPELLS.NOXIOUS_VAPOURS }],
        notes: getSpellHeartNotes("foxglove-token"),
    },
    "foxglove-token-major": {
        dc: 29,
        spells: [
            SPELLS.PUFF_OF_POISON,
            { rank: 3, uuid: SPELLS.NOXIOUS_VAPOURS },
            SPELLS.PETAL_STORM,
            { rank: 4, uuid: SPELLS.WALL_OF_THORNS },
        ],
        notes: getSpellHeartNotes("foxglove-token"),
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
        spells: [SPELLS.SPOUT, [SPELLS.AQUEOUS_ORB, SPELLS.FEET_TO_FINS]],
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
    "pickled-demon-tongue": {
        dc: 17,
        spells: [SPELLS.CAUSTIC_BLAST],
        notes: getSpellHeartNotes("pickled-demon-tongue"),
    },
    "pickled-demon-tongue-greater": {
        dc: 24,
        spells: [SPELLS.CAUSTIC_BLAST, { rank: 3, uuid: SPELLS.ACIDIC_BURST }],
        notes: getSpellHeartNotes("pickled-demon-tongue"),
    },
    "pickled-demon-tongue-major": {
        dc: 29,
        spells: [SPELLS.CAUSTIC_BLAST, SPELLS.ACID_GRIP, { rank: 4, uuid: SPELLS.ACIDIC_BURST }],
        notes: getSpellHeartNotes("pickled-demon-tongue"),
    },
    "polished-demon-horn": {
        dc: 17,
        spells: [SPELLS.DAZE],
        notes: getSpellHeartNotes("polished-demon-horn"),
    },
    "polished-demon-horn-greater": {
        dc: 24,
        spells: [SPELLS.DAZE, { rank: 3, uuid: SPELLS.FEAR }],
        notes: getSpellHeartNotes("polished-demon-horn"),
    },
    "polished-demon-horn-major": {
        dc: 29,
        spells: [SPELLS.DAZE, { rank: 3, uuid: SPELLS.FEAR }, SPELLS.OUTCASTS_CURSE, SPELLS.VISION_OF_DEATH],
        notes: getSpellHeartNotes("polished-demon-horn"),
    },
    "rime-crystal": {
        dc: 17,
        spells: [SPELLS.FROSTBITE],
        notes: getSpellHeartNotes("rime-crystal"),
    },
    "rime-crystal-greater": {
        dc: 24,
        spells: [SPELLS.FROSTBITE, { rank: 3, uuid: SPELLS.CHILLING_SPRAY }],
        notes: getSpellHeartNotes("rime-crystal"),
    },
    "rime-crystal-major": {
        dc: 29,
        spells: [SPELLS.FROSTBITE, SPELLS.ICE_STORM, SPELLS.HOWLING_BLIZZARD],
        notes: getSpellHeartNotes("rime-crystal"),
    },
    "trinity-geode": {
        dc: 17,
        spells: [SPELLS.SCATTER_SCREE],
        notes: getSpellHeartNotes("trinity-geode"),
    },
    "trinity-geode-greater": {
        dc: 24,
        spells: [SPELLS.SCATTER_SCREE, SPELLS.ONE_WITH_STONE],
        notes: getSpellHeartNotes("trinity-geode"),
    },
    "trinity-geode-major": {
        dc: 29,
        spells: [SPELLS.SCATTER_SCREE, { rank: 4, uuid: SPELLS.ONE_WITH_STONE }, SPELLS.SPIKE_STONES],
        notes: getSpellHeartNotes("trinity-geode"),
    },
};

export const SPELL_ITEM_SLUG_LIST = [...Object.keys(SPELL_ITEMS)];

function getSpellHeartNotes(id) {
    const keys = Object.keys(SPELLHEART_EFFECTS?.[id]);
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
                      predicate: ["{item|slug}:armor", "spellcasting:id:{item|id}"],
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
                      predicate: ["{item|slug}:weapon", "spellcasting:id:{item|id}"],
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
