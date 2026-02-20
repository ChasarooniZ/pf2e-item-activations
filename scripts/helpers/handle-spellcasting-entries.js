// Code Initially Sourced and referenced from https://github.com/jessev14/pf2e-staves/tree/main

import { MODULE_ID } from "./const.js";

export async function createSpellcastingEntry({ spellsAdded, dc, actor, item, useItemDC, entryNoteData }) {
    const spellEntryDocument = createSpellcastingEntryDocument({
        tradition: getMostCommonSpellcastingTradition(actor),
        type: "innate",
        ability: getBestMentalAbility(actor),
        dc,
        useItemDC,
        item,
        entryNoteData,
    });

    const [spellcastingEntry] = await actor.createEmbeddedDocuments("Item", [spellEntryDocument]);

    const spells = [];

    for (const spellInfo of spellsAdded) {
        const spellItems = getSpellOptions(spellInfo);

        for (const spellItem of spellItems) {
            const spellUUID = typeof spellItem === "string" ? spellItem : spellItem?.uuid;

            const spell = await getSpell(spellUUID);
            if (!spell) continue;

            const spellRank = spellItem?.rank ?? spell?.system?.level?.value ?? 1;
            const isCantrip = isTheSpellACantrip(spell);
            const uses = spellItem?.uses ?? 1;

            spell.system.location = {
                value: spellcastingEntry.id,
                ...(isCantrip
                    ? {}
                    : {
                          rank: spellRank,
                          uses: {
                              value: uses,
                              max: uses,
                          },
                      }),
            };
            spell.flags[MODULE_ID] = {
                grantedBy: item.toObject(),
            };

            spells.push(spell);
        }
    }

    const [addedSpells] = await actor.createEmbeddedDocuments("Item", spells);
}

function isTheSpellACantrip(spellObject) {
    return spellObject?.system?.traits?.value?.includes("cantrip");
}

function createSpellcastingEntryDocument({ tradition, type, ability, dc, useItemDC, item, entryNoteData }) {
    return {
        name: item.name,
        type: "spellcastingEntry",
        system: {
            rules: [
                ...(useItemDC
                    ? [
                          {
                              key: "AdjustModifier",
                              selector: "spell-dc",
                              predicate: [
                                  "spellcasting:id:{item|id}",
                                  { or: ["modifier:type:ability", "bonus:type:proficiency"] },
                                  { not: "slug:{item|slug}" },
                              ],
                              suppress: true,
                          },
                          {
                              key: "AdjustModifier",
                              selector: "spell-attack",
                              predicate: [
                                  "spellcasting:id:{item|id}",
                                  { or: ["modifier:type:ability", "bonus:type:proficiency"] },
                                  { not: "slug:{item|slug}" },
                              ],
                              suppress: true,
                          },
                          {
                              key: "FlatModifier",
                              value: dc - 10,
                              slug: "{item|slug}",
                              selector: ["spell-dc", "spell-attack"],
                              label: "{item|name}",
                          },
                      ]
                    : []),
                ...(entryNoteData ? entryNoteData : []),
            ],
            slug: item.slug || game.pf2e.system.sluggify(item.name),
            spellDC: {
                value: (useItemDC ? dc : actor.system.attributes.spellDC.value) - 10,
                dc: useItemDC ? dc : actor.system.attributes.spellDC.value,
            },
            traits: {
                otherTags: [],
            },
            ability: {
                value: ability,
            },
            tradition: {
                value: tradition,
            },
            prepared: {
                value: type,
            },
            showSlotlessLevels: {
                value: false,
            },
        },
        flags: {
            [MODULE_ID]: {
                grantedBy: item.toObject(),
            },
        },
    };
}

function getMostCommonSpellcastingTradition(actor) {
    return mode(actor.spellcasting.map((se) => se?.system?.tradition.value).filter((se) => !!se));
}

// Source - https://stackoverflow.com/a/20762713
// Posted by Emissary, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-19, License - CC BY-SA 3.0

function mode(arr) {
    return arr.sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length).pop();
}

function getBestMentalAbility(actor) {
    const highestMentalAbilityValue = Math.max(
        ...Object.keys(actor.abilities)
            .filter((abi) => ["cha", "int", "wis"].includes(abi))
            .map((abi) => actor.abilities[abi].mod)
    );
    // picking best mental ability; not always correct, but it's a good rule of thumb
    return Object.keys(actor.abilities).find((abi) => actor.abilities[abi].mod === highestMentalAbilityValue);
}

async function getSpell(uuid) {
    return (await fromUuid(uuid)).toObject();
}

/**
 *
 * @param {string | (string | object)[] | object} spell
 */
function getSpellOptions(spellOrSpells) {
    if (typeof spellOrSpells === "string" || typeof spellOrSpells === "object") {
        return [spellOrSpells];
    } else {
        return spellOrSpells;
    }
}
