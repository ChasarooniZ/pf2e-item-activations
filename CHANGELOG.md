## 13.0.6

- **Updated**
  - Updated French translation (@rectulo)

## 13.0.5

-   **Updates**
    -   Fixed bug where `minute` wasn't being localized properly causing issue with `per minute` frequencies (🐛 @overkongen)
    -   Added localization for `once`, `twice`, and `per` to account for other languages

## [13.0.4](https://github.com/ChasarooniZ/pf2e-item-activations/compare/13.0.3..13.0.4) - Added French

-   Added french version (@rectulo)

## [13.0.3](https://github.com/ChasarooniZ/pf2e-item-activations/compare/13.0.2..13.0.3) - Fix Resistance RE

-   Fixed RE values for Greater resistance runes (@nyths)

## [13.0.2](https://github.com/ChasarooniZ/pf2e-item-activations/compare/13.0.1..13.0.2) - Handle Issues

-   **Updates**
    -   Added error handling for missing info

## [13.0.1](https://github.com/ChasarooniZ/pf2e-item-activations/compare/13.0.0..13.0.1) - Invested

-   **Updates**
    -   Added invested trait to actions from actions that are invested to support for Thaum's [Intensify Investiture](https://2e.aonprd.com/Feats.aspx?ID=3721)
    -   Added `sourceId` to rune activations (this maybe fixes translation issue if not idek)

## [13.0.0](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.2.2..13.0.0) - China #13

-   **Updates**
    -   Support for Version `13`
    -   Fixes issue where resistance wasn't added properly (🐛 @elpossum)
    -   Fixed issue where rule elements for runes kept being duplicated (🐛 @elpossum)
    -   Fixed issue where blank trait was added
-   **Added**
    -   Chinese Localization (@AlphaStarguide)

## [12.2.2](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.2.1..12.2.2) - No one cared who I was till I put on the mask

-   **Added**
    -   Handles most of the `Bane` rune (it currently handles Fungus and Plant as 2 separate entities though)
-   **Fixed**
    -   Fixes rune rule elements sometimes generating as garbage json (🐛 @Dharkus BSc MInst)

## [12.2.1](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.2.0...12.2.1) - Some Runic Fixes

-   **Added**
    -   Handling `Holy` rune (🐛 @Dharkus BSc MInst)
    -   Handle `Brilliant` rune (🐛 @Dharkus BSc MInst)
-   **Updates**
    -   Fixed flags being set incorrectly when handling runes
    -   Fixed issue where errors could appear when investing in an item with runes for the first time
    -   Fixed issue where Rune based `Activations` weren't properly showing visually in the pf2e inventory

## [12.2.0](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.1.1...12.2.0) - RUNES, RUNES, RUNES

-   `Added`

    -   **Property Rune Support**
        -   `Activations`
            -   Added support to automatically add property rune activations when items have property runes
        -   `Rule Elements`
            -   Added support to automatically add and remove relevant rule elements for runes
        -   **Note:**
            -   All relevant propertry runes except the following are automated:
                -   `Bane`

-   `Fixes`
    -   Makes updates to items adding activations respect the `Enabled for NPC settings`

## [12.1.1](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.1.0...12.1.1) - Poland

-   Updated `Polish` translation (@Lioheart)

## [12.1.0](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.0.2...12.1.0) - Specific Handling- Specific Handling

-   **New**
    -   `Specific Filtering`
        -   Started to filter out some activations that are best handled in other ways
        -   This includes the following:
            -   `Staff`
    -   `Styling`
        -   Added styling for disabled and enabled activations to make it clearer
-   `Fix`
    -   Now handles whether `Tattoo` activations are usable properly

## [12.0.2](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.0.1...12.0.2) - Reacting into Free

-   Fixed issue where reactions and free actions weren't getting processed

## [12.0.1](https://github.com/ChasarooniZ/pf2e-item-activations/compare/12.0.0...12.0.1) - Reduce Console spam

-   Called function in a better way to reduce console spam (@xdy)

## 12.0.0 - V12 Support

-   Added support for fvtt `v12`

## 11.2.6 - Fix activation Autogen bug

-   Fix Bug with activations not autogenerating when activation is updated

## 11.2.5 - Fix Grabbing Unidentified item info

-   Fixed bug where unidentified items were generating activations (@Pyroman2xxx)

## 11.2.4 - Fixed Checking NPC Attacks

-   Module no longer checks NPC attacks for activations

## 11.2.3 - Fixed Issue Ignoring Consumables

-   Fixed logic error for ignoring consumables where it did the opposite (@motherofgod)

## 11.2.2 Exclude Consumable Trait

-   Excludes items that have the consumable trait from generation (@maplealmond)

## 11.2.1 Exclusion Fixes

-   Added exclusions for the "party", "loot", "hazard", "vehicle" actor types

## 11.2.0 Better Beginnings

-   **Update Tours**
    -   On major updates with new features I will be adding a tour that will play for the gm the first time they start foundry after the update
    -   The goal being to introduce users to new features and the features of the module in a way that is more easily understood
-   **Action Count Icons**
    -   By Default when actions are generated they will now use their action count icon
    -   This can be disabled in settings to use the icon of the item that generated them
-   **Localization Options**
    -   Added support for various localizations see the [Language Support](https://github.com/ChasarooniZ/pf2e-item-activations?tab=readme-ov-file#language-support) section for more details on adding other languages (@TaleSale)
-   **Bug Fixes**
    -   Activations that should be disabled now start as disabled when generated in user inventory
    -   Fixed Issue with activation for `Whispering Reeds` not having effect linked (@MrPeach774)
    -   Removed `party` from being considered for activation generation
    -   Removed `feats`, `heritages`, `ancestry`, `background`, and `actions` from being acceptable for activation generation
    -   Added support for letter input of action cost as well as `<span class="pf2-icon">` (@TaleSale)
-   Refactor of much of the code
    _Note_ If you want to regenerate your activations simply delete them, and then unequip and reequip the item. In the future I will add a refresh activation button + option to have them automatically refresh at particular points (On a version update etc.)
    _Extra Note_ If you used this module Prior to version `11.1.0` you will need to regenerate your activations for them to continue functioning

## 11.1.3 Removing Consumables Terror Reign

-   Removes consumables from being considered for auto generation

## 11.1.2 Recommendations

-   Added Recommendation to use in conjunction with Action Support

## 11.1.1 Early Bug Fixes

-   Fixed slugs not being added for autogenerated items
-   Simplified code for adding activations for manually made ones

## 11.1.0 First Full Release

-   **Added Automatic Generation**
    -   Activations that haven't been manually implemented will now _Auto Generate_
    -   Relies on the activations to be formatted the same way as items built in
    -   Can account for both Remaster format, and pre remaster format
-   Major backend changes to help support automatic generation

## 11.0.48

-   Added `Cape of the Mountebank`

## 11.0.47 NPCs

-   **Added NPC Support**
    -   Added Settings for NPCs (to include in normal item add/update)
    -   Also added setting for updating NPCs when you spawn them in the world
-   **Item Updates**
    -   `Activation Effect: Douse Fire` description
    -   `Activation Effect: Through the Flames` description, effects
    -   `Activation Effect: Empty Death` description
    -   `Activation: Elven Alacrity` traits
    -   `Activation: Droskar's Dominance` traits
    -   `Activation: Masquerade` frequency
-   Item Additions
    -   `Boots of Elvenkind (Greater)`
    -   `Bracers of Missile Deflection (Greater)`
    -   `Heartripper Blade`
    -   `Masquerade Scarf (Greater)`
    -   `Ventriloquist's Ring (Greater)`
    -   `Skeleton Key (Greater)`

## 11.0.46 Item Link bug Fix

-   Fixed bug where description of activations wasn't adding the source

## 11.0.45 Fixed infinite Item Dupes bug

-   Fixed Bug where items were duplicated when they had activations instead of adding the activations

## 11.0.44 Actually Fixed Issue

## 11.0.43 Fixed issue with Delete

-   Fixed issue where activations weren't getting deleted

## 11.0.42 Initial Release

-   Releases with the following items
    -   Boots of Elevenkind
    -   Bottled Air
    -   Bracelet of Dashing
    -   Bracers of Missile Deflection
    -   Caterwaul Sling
    -   Grasp of Droskar
    -   Hunter's Brooch
    -   Lantern of Empty Light
    -   Lifting Belt
    -   Masquerade Scarf
    -   Ring of Torag
    -   Serpent Dagger
    -   Skeleton Key
    -   Soulspeaker
    -   The Whispering Reeds
    -   Ventriloquist's Ring
    -   Wayfinder


