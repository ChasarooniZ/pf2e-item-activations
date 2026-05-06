import { SPELLHEART_EFFECTS, SPELLS } from "./const.js";

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
        "brightbloom-posy": {
            dc: 24,
            spells: [SPELLS.TANGLE_VINE, SPELLS.SOOTHING_BLOSSOMS],
            notes: getSpellHeartNotes("brightbloom-posy"),
        },
        "brightbloom-posy-greater": {
            dc: 28,
            spells: [SPELLS.TANGLE_VINE, SPELLS.SOOTHING_BLOSSOMS, SPELLS.PETAL_STORM],
            notes: getSpellHeartNotes("brightbloom-posy"),
        },
        "brightbloom-posy-major": {
            dc: 31,
            spells: [SPELLS.TANGLE_VINE, { rank: 6, uuid: SPELLS.SOOTHING_BLOSSOMS }, SPELLS.BURNING_BLOSSOMS],
            notes: getSpellHeartNotes("brightbloom-posy"),
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
        "crafters-eyepiece=greater": {
            dc: 0,
            spells: [{ rank: 5, uuid: SPELLS.CREATION }],
            notes: SPECIFIC_NOTES.CRAFTERS_EYE_PIECE_GREATER,
        },
        "desolation-locket": {
            dc: 24,
            spells: [SPELLS.HAUNTING_HYMN, SPELLS.FEAR],
            notes: getSpellHeartNotes("desolation-locket", { dc: 24 }),
        },
        "desolation-locket-greater": {
            dc: 30,
            spells: [SPELLS.HAUNTING_HYMN, { rank: 4, uuid: SPELLS.FEAR }, SPELLS.WAVE_OF_DESPAIR],
            notes: getSpellHeartNotes("desolation-locket", { dc: 30 }),
        },
        "desolation-locket-major": {
            dc: 41,
            spells: [
                SPELLS.HAUNTING_HYMN,
                { rank: 7, uuid: SPELLS.WAVE_OF_DESPAIR },
                SPELLS.CANTICLE_OF_EVERLASTING_GRIEF,
            ],
            notes: getSpellHeartNotes("desolation-locket", { dc: 41 }),
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
            notes: getSpellHeartNotes("five-feather-wreath", { speed: 10 }),
        },
        "five-feather-wreath-greater": {
            dc: 24,
            spells: [SPELLS.GALE_BLAST, SPELLS.WALL_OF_WIND],
            notes: getSpellHeartNotes("five-feather-wreath", { speed: 25 }),
        },
        "five-feather-wreath-major": {
            dc: 29,
            spells: [SPELLS.GALE_BLAST, { rank: 4, uuid: SPELLS.WALL_OF_WIND }, SPELLS.AIR_WALK],
            notes: getSpellHeartNotes("five-feather-wreath", { speed: 40 }),
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
        "hand-of-the-mage": {
            dc: 0,
            spells: [SPELLS.TELEKINETIC_HAND],
            tradition: "occult",
            ability: "cha",
        },
        heartmoss: {
            dc: 17,
            spells: [SPELLS.STABILIZE],
            notes: getSpellHeartNotes("heartmoss", {
                stupefiedLabel: `{${game.i18n.localize("PF2E.ConditionTypeStupefied")} 1}`,
            }),
        },
        "heartmoss-greater": {
            dc: 24,
            spells: [SPELLS.STABILIZE, { rank: 3, uuid: SPELLS.HEAL }],
            notes: getSpellHeartNotes("heartmoss", {
                stupefiedLabel: `{${game.i18n.localize("PF2E.ConditionTypeStupefied")} 2}`,
            }),
        },
        "heartmoss-major": {
            dc: 29,
            spells: [
                SPELLS.STABILIZE,
                { rank: 3, uuid: SPELLS.HEAL },
                { rank: 4, uuid: SPELLS.SOUND_BODY },
                SPELLS.HEALING_WELL,
            ],
            notes: getSpellHeartNotes("heartmoss", {
                stupefiedLabel: `{${game.i18n.localize("PF2E.ConditionTypeStupefied")} 3}`,
            }),
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
        "judgment-thurible": {
            dc: 27,
            spells: [SPELLS.DIVINE_LANCE, SPELLS.DIVINE_WRATH],
            notes: getSpellHeartNotes("judgment-thurible"),
        },
        "judgment-thurible-greater": {
            dc: 35,
            spells: [SPELLS.DIVINE_LANCE, { rank: 6, uuid: SPELLS.DIVINE_WRATH }, SPELLS.DIVINE_DECREE],
            notes: getSpellHeartNotes("judgment-thurible"),
        },
        "judgment-thurible-major": {
            dc: 43,
            spells: [SPELLS.DIVINE_LANCE, { rank: 7, uuid: SPELLS.DIVINE_WRATH }, SPELLS.SUMMON_DEIFIC_HERALD],
            notes: getSpellHeartNotes("judgment-thurible"),
        },
        "jyotis-feather": {
            dc: 0,
            spells: [SPELLS.STABILIZE, SPELLS.VITAL_BEACON],
        },
        "jyotis-feather-greater": {
            dc: 0,
            spells: [SPELLS.STABILIZE, { rank: 5, uuid: SPELLS.VITAL_BEACON }, SPELLS.HEALING_WELL],
        },
        "jyotis-feather-major": {
            dc: 0,
            spells: [SPELLS.STABILIZE, { rank: 6, uuid: SPELLS.HEALING_WELL }, SPELLS.FIELD_OF_LIFE],
        },
        "lightweave-scarf": {
            dc: 24,
            spells: [SPELLS.LIGHT, SPELLS.HYPNOTIZE],
            notes: getSpellHeartNotes("lightweave-scarf"),
        },
        "lightweave-scarf-greater": {
            dc: 34,
            spells: [SPELLS.LIGHT, { rank: 6, uuid: SPELLS.HYPNOTIZE }, SPELLS.VIBRANT_PATTERN],
            notes: getSpellHeartNotes("lightweave-scarf"),
        },
        "lightweave-scarf-major": {
            dc: 38,
            spells: [SPELLS.LIGHT, { rank: 8, uuid: SPELLS.VIBRANT_PATTERN }, SPELLS.CONFUSING_COLORS],
            notes: getSpellHeartNotes("lightweave-scarf"),
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
        "sanguine-fang": {
            dc: 25,
            spells: [SPELLS.VOID_WARP, SPELLS.VAMPIRIC_FEAST],
            notes: getSpellHeartNotes("sanguine-fang"),
        },
        "sanguine-fang-greater": {
            dc: 29,
            spells: [SPELLS.VOID_WARP, { rank: 4, uuid: SPELLS.VAMPIRIC_FEAST }],
            notes: getSpellHeartNotes("sanguine-fang"),
        },
        "sanguine-fang-major": {
            dc: 34,
            spells: [SPELLS.VOID_WARP, { rank: 5, uuid: SPELLS.VAMPIRIC_FEAST }, SPELLS.VAMPIRIC_EXSANGUINATION],
            notes: getSpellHeartNotes("sanguine-fang"),
        },
        "saurian-spike": {
            dc: 25,
            spells: [SPELLS.GOUGING_CLAW, SPELLS.DINOSAUR_FORM],
            notes: getSpellHeartNotes("saurian-spike", { dc: 27, fail: 1, critFail: 2 }),
        },
        "saurian-spike-greater": {
            dc: 34,
            spells: [SPELLS.GOUGING_CLAW, { rank: 5, uuid: SPELLS.DINOSAUR_FORM }],
            notes: getSpellHeartNotes("saurian-spike", { dc: 34, fail: 1, critFail: 2 }),
        },
        "saurian-spike-major": {
            dc: 41,
            spells: [SPELLS.GOUGING_CLAW, { rank: 7, uuid: SPELLS.DINOSAUR_FORM }],
            notes: getSpellHeartNotes("saurian-spike", { dc: 41, fail: 2, critFail: 3 }),
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
        "vigilant-eye": {
            dc: 0,
            spells: [SPELLS.DETECT_MAGIC, SPELLS.WEB_OF_EYES],
        },
        "vigilant-eye-greater": {
            dc: 0,
            spells: [SPELLS.DETECT_MAGIC, SPELLS.CLAIRVOYANCE],
        },
        "vigilant-eye-major": {
            dc: 0,
            spells: [SPELLS.DETECT_MAGIC, SPELLS.CLAIRVOYANCE, SPELLS.SCOUTING_EYE],
        },
        "warding-statuette": {
            dc: 23,
            spells: [SPELLS.SHIELD, SPELLS.SPRITUAL_ARMAMENT],
            notes: getSpellHeartNotes("warding-statuette"),
        },
        "warding-statuette-greater": {
            dc: 30,
            spells: [SPELLS.SHIELD, { rank: 5, uuid: SPELLS.SPIRITUAL_WEAPON }, SPELLS.SPRITUAL_GUARDIAN],
            notes: getSpellHeartNotes("warding-statuette"),
        },
    };
}

function getSpellHeartNotes(id, cfg) {
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
                              text: cfg
                                  ? game.i18n.format(`pf2e-item-activations.notes.spellhearts.items.${id}.armor`, cfg)
                                  : `@Localize[pf2e-item-activations.notes.spellhearts.items.${id}.armor]`,
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
                              text: cfg
                                  ? game.i18n.format(`pf2e-item-activations.notes.spellhearts.items.${id}.weapon`, cfg)
                                  : `@Localize[pf2e-item-activations.notes.spellhearts.items.${id}.weapon]`,
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
    CRAFTERS_EYE_PIECE_GREATER: [
        {
            itemType: "spell",
            key: "ItemAlteration",
            mode: "remove",
            predicate: ["item:slug:creation", "spellcasting:id:{item|id}"],
            property: "traits",
            value: "concentrate",
        },
    ],
};
