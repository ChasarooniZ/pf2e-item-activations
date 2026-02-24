// Code Initially Sourced and referenced from https://github.com/jessev14/pf2e-staves/tree/main

import { MODULE_ID } from "../const.js";

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
    const sharedSpellList = [];

    for (const spellInfo of spellsAdded) {
        const spellItems = getSpellOptions(spellInfo);

        const grabbedSpells = await Promise.all(
            spellItems.map(async (s) => await getSpell(typeof s === "string" ? s : s?.uuid))
        );
        let sharedSpellSlugs = [];
        if (grabbedSpells.length > 1) {
            sharedSpellSlugs = grabbedSpells.map((s) => s.system.slug);
            sharedSpellList.push(sharedSpellSlugs);
        }
        let cnt = 0;

        for (const spellItem of spellItems) {
            const spell = grabbedSpells[cnt];
            if (!spell) continue;

            const spellRank = spellItem?.rank ?? spell?.system?.level?.value ?? 1;
            const isCantrip = isTheSpellACantrip(spell);
            const uses = spellItem?.uses ?? 1;

            spell.system.location = {
                value: spellcastingEntry.id,
                ...(isCantrip
                    ? {}
                    : {
                          heightenedLevel: spellRank,
                          uses: {
                              value: uses,
                              max: uses,
                          },
                      }),
            };
            spell.flags[MODULE_ID] = {
                grantedBy: item.toObject(),
                ...(sharedSpellSlugs.length > 0 ? { sharedSpells: sharedSpellSlugs } : {}),
            };

            spells.push(spell);
            cnt++;
        }
    }

    const addedSpells = await actor.createEmbeddedDocuments("Item", spells);
    if (sharedSpellList.length > 0) {
        spellcastingEntry.setFlag(
            MODULE_ID,
            "entrySharedSpells",
            sharedSpellList.map((spellSlugs) =>
                spellSlugs.map((slug) => addedSpells.find((spell) => spell.system.slug === slug).id)
            )
        );
    }
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
            slug: item.system.slug || game.pf2e.system.sluggify(item.name),
            spellDC: {
                value: (useItemDC ? dc : item.actor.system.attributes.spellDC.value) - 10,
                dc: useItemDC ? dc : item.actor.system.attributes.spellDC.value,
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
 * Turns Array or object into an array of a single object or an array of objects
 * @param {string | (string | object)[] | object} spell
 */
function getSpellOptions(spellOrSpells) {
    if (Array.isArray(spellOrSpells)) {
        return spellOrSpells;
    } else {
        return [spellOrSpells];
    }
}

//TODO use this when rendering the character sheet I guess?
function createLinkHTML(spellNames, colorGroup = "") {
    return `<i class="fa-solid fa-link linked-spells-icon ${colorGroup}" data-tooltip="${game.i18n.format("pf2e-item-activations.notes.spells.joined", { spells: spellNames.join(", ") })}"></i>`;
}

export async function checkAndUpdateLinkedSpellcastingItem(item, changes) {
    if (!Object.hasOwn(changes?.system?.location?.uses ?? {}, "value")) return;
    const sharedSpellSlugs = item.getFlag(MODULE_ID, "sharedSpells");
    if (!sharedSpellSlugs) return;
    const actor = item.actor;
    const linkedSpellItems = actor.items.filter(
        (i) =>
            i?.system?.location?.value === item.system?.location?.value &&
            i?.system?.location?.uses?.value !== changes?.system?.location?.uses?.value &&
            sharedSpellSlugs.includes(i.system.slug) &&
            i.system.slug !== item.system.slug
    );
    actor.updateEmbeddedDocuments(
        "Item",
        linkedSpellItems.map((spell) => ({
            _id: spell.id,
            system: {
                location: {
                    uses: {
                        value: changes?.system?.location?.uses?.value,
                    },
                },
            },
        })),
        { noHook: true }
    );
}

const colorGroups = ["a", "b", "c", "d"];

export function linkedSpellStyling(actor, html) {
    const entries = actor.items.filter((item) => item.getFlag(MODULE_ID, "entrySharedSpells"));
    for (const entry of entries) {
        const sharedSpellGroups = entry.getFlag(MODULE_ID, "entrySharedSpells");
        let cnt = 0;
        for (const sharedSpellGroup of sharedSpellGroups) {
            const spells = sharedSpellGroup.map((spellID) => actor.items.get(spellID));
            const text = createLinkHTML(
                spells.map((spell) => spell.name),
                sharedSpellGroups.length > 1 ? colorGroups[cnt] : ""
            );
            for (const spell of spells) {
                html.find(
                    `li.spellcasting-entry[data-item-id="${entry.id}"] li.spell[data-item-id="${spell.id}"] h4.name a`
                ).after(text);
            }
        }
    }
}
