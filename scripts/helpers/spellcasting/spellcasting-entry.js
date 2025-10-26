// Code Initially Sourced and referenced from https://github.com/jessev14/pf2e-staves/tree/main

async function createSpellcastingEntry({ spellsAdded, dc, actor, existingEntry = null }) {
    const spells = [];

    for (const spellInfo of spellsAdded) {
        const spellItems = getSpellOptions(spellInfo);

        for (const spellItem of spellItems) {
            const spellUUID = typeof spellItem === "string" ? spellItem : spellItem?.uuid;

            const spell = await fromUuid(spellUUID);
            if (!spell || spell?.type !== "spell") continue;

            const spellRank = spellItem?.rank ?? spell?.rank ?? 1;

            let spellClone;
            if (spell.id) spellClone = spell.clone({ "system.location.heightenedLevel": spellRank });
            else {
                const { pack, _id } = spell;
                const spellFromPack = await game.packs
                    .get(pack)
                    ?.getDocuments()
                    .find((s) => s.id === _id);
                spellClone = spellFromPack.clone({ "system.location.heightenedLevel": spellRank });
            }

            spells.push(spellClone);
        }
    }

    if (!spells.length) return;


    if (!existingEntry) {
        const highestMentalAbilityValue = Math.max(
            ...Object.keys(actor.abilities)
                .filter((abi) => ["cha", "int", "wis"].includes(abi))
                .map((abi) => actor.abilities[abi].mod)
        );
        // picking best mental ability; not always correct, but it's a good rule of thumb
        const bestMentalAbility = Object.keys(actor.abilities).find(
            (abi) => actor.abilities[abi].mod === highestMentalAbilityValue
        );
        // rule of thumb for tradition is to pick whatever exists in other spellcasting entries
        const mostCommonTradition = mostCommonInList(
            actor.spellcasting.map((se) => se?.system?.tradition.value).filter((se) => !!se)
        );
        const createData = {
            type: "spellcastingEntry",
            name: stave.name,
            system: {
                prepared: {
                    value: "charge",
                },
                ability: {
                    value: bestMentalAbility,
                },
                tradition: {
                    value: mostCommonTradition,
                },
                showSlotlessLevels: {
                    value: false,
                },
            },
            flags: {
                [moduleID]: {
                    staveID: stave.id,
                    charges: getHighestSpellslot(actor),
                    prevDescription: description,
                },
            },
        };
        const [spellcastingEntry] = await actor.createEmbeddedDocuments("Item", [createData]);
        for (const spell of spells) await spellcastingEntry.addSpell(spell, spell.level);
    } else {
        for (const spell of existingEntry.spells) await spell.delete();
        for (const spell of spells) await existingEntry.addSpell(spell, spell.level);
        await existingEntry.setFlag(moduleID, "prevDescription", description);
    }
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
