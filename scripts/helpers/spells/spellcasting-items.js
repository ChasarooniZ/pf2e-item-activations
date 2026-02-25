const SPELLS = {
    AIR_WALK: "Compendium.pf2e.spells-srd.Item.b5sGjGlBf58f8jn0",
    ACID_GRIP: "Compendium.pf2e.spells-srd.Item.9h9YCncqah6VNsKf",
    ACID_SPLASH: "Compendium.pf2e.spells-srd.Item.gISYsBFby1TiXfBt",
    ACIDIC_BURST: "Compendium.pf2e.spells-srd.Item.rnNGALRtsjspFTws",
    AUGURY: "Compendium.pf2e.spells-srd.Item.41TZEjhO6D1nWw2X",
    AQUEOUS_ORB: "Compendium.pf2e.spells-srd.Item.oUDNCArkQTdhllxD",
    BITING_WORDS: "Compendium.pf2e.spells-srd.Item.yafsV0ni7rFgqJBj",
    BLUR: "Compendium.pf2e.spells-srd.Item.3JG1t3T4mWn6vTke",
    BULLHORN: "Compendium.pf2e.spells-srd.Item.W02bHXylIpoXbO4e",
    CAUSTIC_BLAST: "Compendium.pf2e.spells-srd.Item.thAHF1zxNplLCJPO",
    CHILLING_SPRAY: "Compendium.pf2e.spells-srd.Item.8TQiFzGf4feoHeH0",
    CURSED_METAMORPHOSIS: "Compendium.pf2e.spells-srd.Item.dN8QBNuTiaBHCKUe",
    DAZE: "Compendium.pf2e.spells-srd.Item.4gBIw4IDrSfFHik4",
    DETECT_MAGIC: "Compendium.pf2e.spells-srd.Item.gpzpAAAJ1Lza2JVl",
    DIVINE_LANCE: "Compendium.pf2e.spells-srd.Item.qwZBXN6zBoB9BHXE",
    DRAW_THE_LIGHTNING: "Compendium.pf2e.spells-srd.Item.n7OgbKme4hNwxVwQ",
    ELECTRIC_ARC: "Compendium.pf2e.spells-srd.Item.kBhaPuzLUSwS6vVf",
    ENERVATION: "Compendium.pf2e.spells-srd.Item.eexkxcqnkXazsGfK",
    ENLARGE: "Compendium.pf2e.spells-srd.Item.wzctak6BxOW8xvFV",
    FEAR: "Compendium.pf2e.spells-srd.Item.4koZzrnMXhhosn0D",
    FEET_TO_FINS: "Compendium.pf2e.spells-srd.Item.RvBlSIJmxiqfCpR9",
    FIGMENT: "Compendium.pf2e.spells-srd.Item.0zU8CPejjQFnhZFI",
    FIREBALL: "Compendium.pf2e.spells-srd.Item.sxQZ6yqTn0czJxVd",
    FORBIDDING_WARD: "Compendium.pf2e.spells-srd.Item.RA7VKcen3p56rVyZ",
    FROSTBITE: "Compendium.pf2e.spells-srd.Item.IxhGEKl63R4QBvkj",
    GALE_BLAST: "Compendium.pf2e.spells-srd.Item.dDiOnjcsBFbAvP6t",
    GHOST_SOUND: "Compendium.pf2e.spells-srd.Item.atlgGNI1E1Ox3O3a",
    GOUGING_CLAW: "Compendium.pf2e.spells-srd.Item.MPxbKoR54gkYkqLO",
    GUIDANCE: "Compendium.pf2e.spells-srd.Item.izcxFQFwf3woCnFs",
    HARM: "Compendium.pf2e.spells-srd.Item.wdA52JJnsuQWeyqz",
    HEAL: "Compendium.pf2e.spells-srd.Item.rfZpqmj0AIIdkVIs",
    HEALING_WELL: "Compendium.pf2e.spells-srd.Item.CzjQtkRuRlzRvwzg",
    HOWLING_BLIZZARD: "Compendium.pf2e.spells-srd.Item.xxWhyl81w3ckslAU",
    HYDRAULIC_TORRENT: "Compendium.pf2e.spells-srd.Item.Y3G6Y6EDgCY0s3fq",
    ICE_STORM: "Compendium.pf2e.spells-srd.Item.kHyjQbibRGPNCixx",
    IGNITION: "Compendium.pf2e.spells-srd.Item.6DfLZBl8wKIV03Iq",
    KNOW_THE_WAY: "Compendium.pf2e.spells-srd.Item.tXa5vOu5giBNCjdR",
    LIGHT: "Compendium.pf2e.spells-srd.Item.WBmvzNDfpwka3qT4",
    LIGHTNING_BOLT: "Compendium.pf2e.spells-srd.Item.9AAkVUCwF6WVNNY2",
    MAGNETIC_ACCELERATION: "Compendium.pf2e.spells-srd.Item.Tx8OqkBFA2QlaldW",
    MESSAGE: "Compendium.pf2e.spells-srd.Item.vLzFcIaSXs7YTIqJ",
    MIRRORS_MISFORTUNE: "Compendium.pf2e.spells-srd.Item.A7w3YQBrFNH8KYsB",
    MIRROR_MALEFACTORS: "Compendium.pf2e.spells-srd.Item.CmZCq4htcZ6W0TKk",
    NEEDLE_DARTS: "Compendium.pf2e.spells-srd.Item.iYRDFxeVpJ5KIjmr",
    NOISE_BLAST: "Compendium.pf2e.spells-srd.Item.wzLkNU3AAqOSKFPR",
    NOXIOUS_VAPOURS: "Compendium.pf2e.spells-srd.Item.1meVElIu1CEVYWkv",
    ONE_WITH_STONE: "Compendium.pf2e.spells-srd.Item.vh1RpbWfqdNC4L3P",
    OUTCASTS_CURSE: "Compendium.pf2e.spells-srd.Item.KSAEhNfZyXMO7Z7V",
    PAINFUL_VIBRATIONS: "Compendium.pf2e.spells-srd.Item.qTzvVnAMWL05VitC",
    PETAL_STORM: "Compendium.pf2e.spells-srd.Item.D31YX7zvRBvenTAz",
    PHANTASMAL_CALAMITY: "Compendium.pf2e.spells-srd.Item.0XP2XOxT9VSiXFDr",
    PHANTASMAL_TREASURE: "Compendium.pf2e.spells-srd.Item.L0GoJpHxSD0wRY5k",
    PLANT_FORM: "Compendium.pf2e.spells-srd.Item.zCcfPS4y5SrZzU2x",
    PRESTIDIGITATION: "Compendium.pf2e.spells-srd.Item.Qw3fnUlaUbnn7ipC",
    PUFF_OF_POISON: "Compendium.pf2e.spells-srd.Item.D7ZEhTNIDWDLC2J4",
    RAY_OF_FROST: "Compendium.pf2e.spells-srd.Item.gYjPm7YwGtEa1oxh",
    READ_AURA: "Compendium.pf2e.spells-srd.Item.OhD2Z6rIGGD5ocZA",
    RESTORATION: "Compendium.pf2e.spells-srd.Item.SnaLVgxZ9ryUFmUr",
    RUST_CLOUD: "Compendium.pf2e.spells-srd.Item.yy2K51kK3a60rRIe",
    SCATTER_SCREE: "Compendium.pf2e.spells-srd.Item.zA0jNIBRgLsyTpbm",
    SHIELD: "Compendium.pf2e.spells-srd.Item.TVKNbcgTee19PXZR",
    SIGIL: "Compendium.pf2e.spells-srd.Item.AUctDF2fqPZN2w4W",
    SOUND_BODY: "Compendium.pf2e.spells-srd.Item.Et8RSCLx8w7uOLvo",
    SPIKE_STONES: "Compendium.pf2e.spells-srd.Item.3xD8DYrr8YDVYGg7",
    SPRITUAL_ARMAMENT: "Compendium.pf2e.spells-srd.Item.WPu3UE3kTXSLqO40",
    SPRITUAL_GUARDIAN: "Compendium.pf2e.spells-srd.Item.jQdm301h6e8hIY4U",
    SPIRITUAL_WEAPON: "Compendium.pf2e.spells-srd.Item.Fq9yCbqI2RDt6Orw",
    SPOUT: "Compendium.pf2e.spells-srd.Item.eSL5hVT9gXrnRLtd",
    STABILIZE: "Compendium.pf2e.spells-srd.Item.SnjhtQYexDtNDdEg",
    SUMMON_ANIMAL: "Compendium.pf2e.spells-srd.Item.4YnON9JHYqtLzccu",
    TAME: "Compendium.pf2e.spells-srd.Item.s7ILzY2xh1tc9U1v",
    TANGLE_VINE: "Compendium.pf2e.spells-srd.Item.uZK2BYzPnxUBnDjr",
    TELEKINETIC_HAND: "Compendium.pf2e.spells-srd.Item.pwzdSlJgYqN7bs2w",
    TELEKINETIC_PROJECTILE: "Compendium.pf2e.spells-srd.Item.60sgbuMWN0268dB7",
    TIMBER: "Compendium.pf2e.spells-srd.Item.9I8mp7RkjeXbkYfx",
    WALL_OF_FIRE: "Compendium.pf2e.spells-srd.Item.IarZrgCeaiUqOuRu",
    WALL_OF_THORNS: "Compendium.pf2e.spells-srd.Item.KsWhliKfUs3IpW3c",
    WALL_OF_WIND: "Compendium.pf2e.spells-srd.Item.it4ZsAi6XgvGcodc",
    VISION_OF_DEATH: "Compendium.pf2e.spells-srd.Item.Jmxru8zMdYMRuO5n",
    VITALITY_LASH: "Compendium.pf2e.spells-srd.Item.kcelf6IHl3L9VXXg",
    VOID_WARP: "Compendium.pf2e.spells-srd.Item.mAMEt4FFbdqoRnkN",
};

const SPELLHEART_EFFECTS = {
    "clay-sphere": {
        weapon: "Compendium.pf2e.equipment-effects.Item.La2ziyuLYKG0thOj",
    },
    "enigma-mirror": {
        armor: "Compendium.pf2e-item-activations.item-activations-effects.Item.DWZgLolqLRcfQb5W",
        weapon: "Compendium.pf2e-item-activations.item-activations-effects.Item.ydHmaMoiG1HupZm9",
    },
    "five-feather-wreath": {
        weapon: "Compendium.pf2e.equipment-effects.Item.nQ6vM1CRLyvQdGLG",
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
    heartmoss: {
        weapon: "",
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
    "spiny-lodestone": {
        weapon: "Compendium.pf2e.equipment-effects.Item.m6z7OrJgF4XQFNpa",
    },
    "thorn-triad": {
        armor: "Compendium.pf2e.equipment-effects.Item.JaPNzmgD7p7hHH8o",
        weapon: "Compendium.pf2e.equipment-effects.Item.FTj94xTqZbaCs4jT",
    },
    "trinity-geode": {
        armor: "Compendium.pf2e.equipment-effects.Item.oqwrw6XztVlS9tEG",
        weapon: "Compendium.pf2e.equipment-effects.Item.WRV0XjiEHdlBpduS",
    },
    "warding-statuette": {
        weapon: "Compendium.pf2e.equipment-effects.Item.gwiyabYi92R97bXZ",
    },
};

// Defaults to 1 / day
// Only handles per day spells
// {uses: 2} is for multiple uses
// Defaults to default spell rank
// If array then its pick one
// strictDC = dc must be the value set
export let SPELL_ITEMS = {};

export function setupSpellItems() {
    SPELL_ITEMS = {
        "aeon-stone-agate-ellipsoid": {
            dc: 0,
            spells: [SPELLS.AUGURY],
            tradition: "divine",
            ability: "cha",
        },
        "beastmasters-sigil": {
            dc: 17,
            spells: [SPELLS.TAME, { rank: 2, uuid: SPELLS.SUMMON_ANIMAL }],
            notes: SPECIFIC_NOTES.BEASTMASTERS_SIGIL(""),
        },
        "beastmasters-sigil-greater": {
            dc: 23,
            spells: [SPELLS.TAME, { rank: 3, uuid: SPELLS.SUMMON_ANIMAL }],
            notes: SPECIFIC_NOTES.BEASTMASTERS_SIGIL("greater"),
        },
        "beastmasters-sigil-major": {
            dc: 25,
            spells: [SPELLS.TAME, { rank: 4, uuid: SPELLS.SUMMON_ANIMAL }],
            notes: SPECIFIC_NOTES.BEASTMASTERS_SIGIL("major"),
        },
        // "cantrip-deck-5-pack": {
        //     dc: 0,
        //     spells: [{uses: 1, }]
        // For the spells it needs to search the item description for the spell
        // It also needs to sync the count specifically with the uses
        // },
        // "cantrip-deck-full-pack": {
        //     // Needs to store a flag on itself with what spells are left to be used
        //     // add rule element to give all of the spells the manipulate and concentrate traits
        //     // Find a way to force the rank
        //     dc: 15,
        //     spells: [
        //         SPELLS.ACID_SPLASH,
        //         SPELLS.VOID_WARP,
        //         SPELLS.LIGHT,
        //         SPELLS.DAZE,
        //         SPELLS.DETECT_MAGIC,
        //         SPELLS.VITALITY_LASH,
        //         SPELLS.DIVINE_LANCE,
        //         SPELLS.ELECTRIC_ARC,
        //         SPELLS.FORBIDDING_WARD,
        //         SPELLS.GHOST_SOUND.SPELLS.GUIDANCE,
        //         SPELLS.KNOW_THE_WAY,
        //         SPELLS.LIGHT,
        //         SPELLS.TELEKINETIC_HAND,
        //         SPELLS.MESSAGE,
        //         SPELLS.PRESTIDIGITATION,
        //         SPELLS.IGNITION,
        //         SPELLS.RAY_OF_FROST,
        //         SPELLS.READ_AURA,
        //         SPELLS.SHIELD,
        //         SPELLS.SIGIL,
        //         SPELLS.STABILIZE,
        //         SPELLS.TANGLE_VINE,
        //         SPELLS.TELEKINETIC_PROJECTILE
        //     ]
        // },
        "charlatans-gloves": {
            dc: 0,
            spells: [SPELLS.TELEKINETIC_HAND],
            tradition: "occult",
            ability: "cha",
        },
        "charlatans-gloves-greater": {
            dc: 0,
            spells: [SPELLS.TELEKINETIC_HAND],
            tradition: "occult",
            ability: "cha",
            notes: SPECIFIC_NOTES.CHARLATANS_GLOVES_GREATER,
        },
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
        "cloak-of-illusions": {
            dc: 0,
            spells: [SPELLS.FIGMENT],
            tradition: "occult",
            ability: "cha",
        },
        "cloak-of-illusions-greater": {
            dc: 0,
            spells: [SPELLS.FIGMENT],
            tradition: "occult",
            ability: "cha",
            notes: SPECIFIC_NOTES.CHARLATANS_GLOVES_GREATER,
        },
        "compass-of-luong-phung": {
            dc: 0,
            spells: [SPELLS.KNOW_THE_WAY],
            note: [
                getSpellNote({
                    spellSlug: "compass-of-luong-phung",
                    textPath: "pf2e-item-activations.notes.spellhearts.items.compass-of-luong-phung",
                }),
            ],
        },
        "enigma-mirror": {
            dc: 23,
            spells: [SPELLS.FORBIDDING_WARD, SPELLS.BLUR],
            notes: getSpellHeartNotes("enigma-mirror"),
        },
        "enigma-mirror-greater": {
            dc: 27,
            spells: [SPELLS.FORBIDDING_WARD, SPELLS.MIRRORS_MISFORTUNE],
            notes: getSpellHeartNotes("enigma-mirror"),
        },
        "enigma-mirror-major": {
            dc: 30,
            spells: [SPELLS.FORBIDDING_WARD, SPELLS.MIRRORS_MISFORTUNE, SPELLS.MIRROR_MALEFACTORS],
            notes: getSpellHeartNotes("enigma-mirror"),
        },
        "five-feather-wreath": {
            dc: 18,
            spells: [SPELLS.GALE_BLAST],
            notes: getSpellHeartNotes("five-feather-wreath"),
        },
        "five-feather-wreath-greater": {
            dc: 24,
            spells: [SPELLS.GALE_BLAST, SPELLS.WALL_OF_WIND],
            notes: getSpellHeartNotes("five-feather-wreath"),
        },
        "five-feather-wreath-major": {
            dc: 29,
            spells: [SPELLS.GALE_BLAST, { rank: 4, uuid: SPELLS.WALL_OF_WIND }, SPELLS.AIR_WALK],
            notes: getSpellHeartNotes("five-feather-wreath"),
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
        heartmoss: {
            dc: 17,
            spells: [SPELLS.STABILIZE],
            notes: getSpellHeartNotes("heartmoss"),
        },
        "heartmoss-greater": {
            dc: 24,
            spells: [SPELLS.STABILIZE, { rank: 3, uuid: SPELLS.HEAL }],
            notes: getSpellHeartNotes("heartmoss"),
        },
        "heartmoss-major": {
            dc: 29,
            spells: [
                SPELLS.STABILIZE,
                { rank: 3, uuid: SPELLS.HEAL },
                { rank: 4, uuid: SPELLS.SOUND_BODY },
                SPELLS.HEALING_WELL,
            ],
            notes: getSpellHeartNotes("heartmoss"),
        },
        "hunters-brooch": {
            dc: 0,
            spells: [SPELLS.VITALITY_LASH],
            tradition: "divine",
            ability: "cha",
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
        "mages-hat": {
            dc: 0,
            spells: [SPELLS.PRESTIDIGITATION],
            tradition: "arcane",
            ability: "cha",
        },
        "mages-hat-greater": {
            dc: 0,
            spells: [SPELLS.PRESTIDIGITATION],
            tradition: "arcane",
            ability: "cha",
        },
        "magical-medal-griffons-heart": {
            dc: 0,
            spells: [SPELLS.FORBIDDING_WARD],
            ability: "cha",
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
        "phantasmal-doorknob": {
            dc: 20,
            spells: [SPELLS.FIGMENT, SPELLS.PHANTASMAL_TREASURE],
        },
        "phantasmal-doorknob-greater": {
            dc: 27,
            spells: [SPELLS.FIGMENT, SPELLS.VISION_OF_DEATH],
        },
        "phantasmal-doorknob-major": {
            dc: 34,
            spells: [SPELLS.FIGMENT, { rank: 6, uuid: SPELLS.VISION_OF_DEATH }, SPELLS.PHANTASMAL_CALAMITY],
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
        "resonating-fork": {
            dc: 19,
            spells: [SPELLS.BULLHORN, SPELLS.BITING_WORDS],
            notes: SPECIFIC_NOTES.RESONATING_FORK(""),
        },
        "resonating-fork-greater": {
            dc: 23,
            spells: [SPELLS.BULLHORN, { rank: 2, uuid: SPELLS.BITING_WORDS }, SPELLS.NOISE_BLAST],
            notes: SPECIFIC_NOTES.RESONATING_FORK("greater"),
        },
        "resonating-fork-major": {
            dc: 29,
            spells: [SPELLS.BULLHORN, { rank: 4, uuid: SPELLS.BITING_WORDS }, SPELLS.PAINFUL_VIBRATIONS],
            notes: SPECIFIC_NOTES.RESONATING_FORK("major"),
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
        "ring-of-sigils": {
            dc: 0,
            spells: [SPELLS.SIGIL],
            tradition: "arcane",
            ability: "cha",
        },
        "ring-of-sigils-greater": {
            dc: 0,
            spells: [SPELLS.SIGIL],
            tradition: "arcane",
            ability: "cha",
        },
        "spiny-lodestone": {
            dc: 18,
            spells: [SPELLS.NEEDLE_DARTS],
            notes: getSpellHeartNotes("spiny-lodestone"),
        },
        "spiny-lodestone-greater": {
            dc: 24,
            spells: [SPELLS.NEEDLE_DARTS, SPELLS.MAGNETIC_ACCELERATION],
            notes: getSpellHeartNotes("spiny-lodestone"),
        },
        "spiny-lodestone-major": {
            dc: 29,
            spells: [SPELLS.NEEDLE_DARTS, { rank: 4, uuid: SPELLS.MAGNETIC_ACCELERATION }, SPELLS.RUST_CLOUD],
            notes: getSpellHeartNotes("spiny-lodestone"),
        },
        "thorn-triad": {
            dc: 18,
            spells: [SPELLS.TIMBER],
            notes: getSpellHeartNotes("thorn-triad"),
        },
        "thorn-triad-greater": {
            dc: 24,
            spells: [SPELLS.TIMBER, SPELLS.WALL_OF_THORNS],
            notes: getSpellHeartNotes("thorn-triad"),
        },
        "thorn-triad-major": {
            dc: 29,
            spells: [SPELLS.TIMBER, { rank: 4, uuid: SPELLS.WALL_OF_THORNS }, SPELLS.PETAL_STORM],
            notes: getSpellHeartNotes("thorn-triad"),
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
        "warding-statuette": {
            dc: 23,
            spells: [SPELLS.SHIELD, SPELLS.BLUR],
            notes: getSpellHeartNotes("warding-statuette"),
        },
        "warding-statuette-greater": {
            dc: 30,
            spells: [SPELLS.SHIELD, SPELLS.MIRRORS_MISFORTUNE],
            notes: getSpellHeartNotes("warding-statuette"),
        },
    };
}

export const SPELL_ITEM_SLUG_LIST = [...Object.keys(SPELL_ITEMS)];

function getSpellHeartNotes(id) {
    const keys = Object.keys(SPELLHEART_EFFECTS?.[id] || {});
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
                              text: `@Localize[pf2e-item-activations.notes.spellhearts.items.${id}.armor]`,
                              title: "pf2e-item-activations.notes.spellhearts.terms.armor",
                          },
                          ...(SPELLHEART_EFFECTS?.[id]?.armor
                              ? [{ text: `@UUID[${SPELLHEART_EFFECTS?.[id]?.armor}]` }]
                              : []),
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
                              text: `@Localize[pf2e-item-activations.notes.spellhearts.items.${id}.weapon]`,
                              title: "pf2e-item-activations.notes.spellhearts.terms.weapon",
                          },
                          ...(SPELLHEART_EFFECTS?.[id]?.weapon
                              ? [{ text: `@UUID[${SPELLHEART_EFFECTS?.[id]?.weapon}]` }]
                              : []),
                      ],
                  },
              ]
            : []),
    ];
}

function getSpellNote({ spellSlug, textPath }) {
    return {
        itemType: "spell",
        key: "ItemAlteration",
        mode: "add",
        predicate: [`item:slug:${spellSlug}`, "spellcasting:id:{item|id}"],
        property: "description",
        value: [
            {
                text: `<p>@Localize[${textPath}]</p>`,
            },
        ],
    };
}

export function isSpellHeart(item) {
    return item.system.traits.value.includes("spellheart");
}

export function needsSpellcasting(item) {
    return item.system.traits.value.includes("spellheart");
}

const SPECIFIC_NOTES = {
    BEASTMASTERS_SIGIL: (type) => {
        let creatures = {};
        switch (type) {
            case "":
                creatures = {
                    armor: "Compendium.pf2e.pathfinder-monster-core.Actor.A4VgQIHsqJKssQOM", // Hunting Spider
                    "melee-weapon": "Compendium.pf2e.pathfinder-monster-core.Actor.BN5Lb6IsQ9Wyu3rL", // Wolf
                    "ranged-weapon": "Compendium.pf2e.pathfinder-monster-core.Actor.2mg30nJR6P3HJDSd", // Vampire Bat Swarm
                };
                break;
            case "greater":
                creatures = {
                    armor: "Compendium.pf2e.pathfinder-monster-core.Actor.oyfheSs1ta4xvtEg", // Giant Monitor Lizard
                    "melee-weapon": "Compendium.pf2e.pathfinder-monster-core.Actor.IyhbcdTVmkV4pSju", // Boar
                    "ranged-weapon": "Compendium.pf2e.pathfinder-monster-core.Actor.xnpuGO8jEMba9wy5", // Giant Bat
                };
                break;
            case "major":
                creatures = {
                    armor: "Compendium.pf2e.pathfinder-monster-core.Actor.BWm17BRQYGMLqtNe", // Giant Scorpion
                    "melee-weapon": "Compendium.pf2e.pathfinder-monster-core.Actor.AFWmiIBJ7ypgydQD", // Dire Wolf
                    "ranged-weapon": "Compendium.pf2e.pathfinder-monster-core-2.Actor.JXM2kmdb1PhuEJls", // Fen Mosquito Swarm
                };
                break;
        }
        return [
            {
                key: "RollOption",
                label: "{item|name}",
                option: "{item|slug}",
                placement: "spellcasting",
                toggleable: true,
                suboptions: [
                    { label: "pf2e-item-activations.notes.spellhearts.terms.melee-weapon", value: "melee-weapon" },
                    { label: "pf2e-item-activations.notes.spellhearts.terms.ranged-weapon", value: "ranged-weapon" },
                    { label: "pf2e-item-activations.notes.spellhearts.terms.armor", value: "armor" },
                ],
                alwaysActive: true,
                value: true,
            },
            {
                itemType: "spell",
                key: "ItemAlteration",
                mode: "add",
                predicate: ["{item|slug}:melee-weapon", "spellcasting:id:{item|id}", "item:slug:beastmasters-sigil"],
                property: "description",
                value: [
                    {
                        text: `@Localize[pf2e-item-activations.notes.spellhearts.items.beastmasters-sigil] @UUID[${creatures["melee-weapon"]}]`,
                    },
                ],
            },
            {
                itemType: "spell",
                key: "ItemAlteration",
                mode: "add",
                predicate: ["{item|slug}:ranged-weapon", "spellcasting:id:{item|id}", "item:slug:beastmasters-sigil"],
                property: "description",
                value: [
                    {
                        text: `@Localize[pf2e-item-activations.notes.spellhearts.items.beastmasters-sigil] @UUID[${creatures["ranged-weapon"]}]`,
                    },
                ],
            },
            {
                itemType: "spell",
                key: "ItemAlteration",
                mode: "add",
                predicate: ["{item|slug}:armor", "spellcasting:id:{item|id}", "item:slug:beastmasters-sigil"],
                property: "description",
                value: [
                    {
                        text: `@Localize[pf2e-item-activations.notes.spellhearts.items.beastmasters-sigil] @UUID[${creatures["armor"]}]`,
                    },
                ],
            },
        ];
    },
    CHARLATANS_GLOVES_GREATER: [
        {
            itemType: "spell",
            key: "ItemAlteration",
            mode: "add",
            predicate: ["spellcasting:id:{item|id}"],
            property: "description",
            value: [
                {
                    text: "@Localize[pf2e-item-activations.notes.misc.charlatans-gloves-greater]",
                },
            ],
        },
    ],
    RESONATING_FORK: (type) => {
        const cfg = { duration: "", durationCrit: "" };
        switch (type) {
            case "":
                cfg.duration = `1 ${game.i18n.localize("PF2E.Duration.round")}`;
                cfg.durationCrit = `3 ${game.i18n.localize("PF2E.Time.Unit.Rounds").toLowerCase()}`;
                break;
            case "greater":
                cfg.duration = `3 ${game.i18n.localize("PF2E.Time.Unit.Rounds").toLowerCase()}`;
                cfg.durationCrit = `1 ${game.i18n.localize("PF2E.Duration.PT1M")}`;
                break;
            case "major":
                cfg.duration = `1 ${game.i18n.localize("PF2E.Duration.PT1M")}}`;
                cfg.durationCrit = `1 ${game.i18n.localize("PF2E.Duration.PT1H")}`;
                break;
        }

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
            {
                itemType: "spell",
                key: "ItemAlteration",
                mode: "add",
                predicate: ["{item|slug}:weapon", "spellcasting:id:{item|id}"],
                property: "description",
                value: [
                    {
                        text: game.i18n.format("pf2e-item-activations.notes.spellhearts.items.resonating-fork", cfg),
                    },
                ],
            },
        ];
    },
};
