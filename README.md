![](https://img.shields.io/badge/Foundry-v11-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/ChasarooniZ/pf2e-item-activations/latest/module.zip)

<!--- Forge Bazaar Install % Badge -->
<!--- replace <your-module-name> with the `name` in your manifest -->
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fpf2e-item-activations&colorB=4aa94a)


# PF2e Item Activations
Adds actions based on items activations. There are manually inputted items (see [Supported Items](#supported-items)), but there is also an automatic generation system to generate items.
![Module In Action](https://media.discordapp.net/attachments/880969157846392842/1216869819153121280/ItemActivationsInAction.gif?ex=6601f555&is=65ef8055&hm=bc150d7c0c52030df17ca34faba7bb19ac42fb270aeddb694cf26030af45ba90&=)
## Table of Contents
- [PF2e Item Activations](#pf2e-item-activations)
  - [Table of Contents](#table-of-contents)
    - [Notes and Limitations](#notes-and-limitations)
      - [Notes](#notes)
      - [Limitations](#limitations)
  - [Features](#features)
    - [Supported Items](#supported-items)
  - [Settings](#settings)
  - [Language Support](#language-support)
  - [FAQ](#faq)

### Notes and Limitations
#### Notes
- This module will exist until this feature is implemented into the core system
- Module will be updated sporadically as I get time and motivation
#### Limitations
- Currently no Custom Activations (will most likely be a later feature)
- Activations in actors aren't updated unless you remove them and get them readded
- Activations only appear when an item is added/updated
- Activations currently don't have their own action category, I may look into that to see how difficult it would be
- Activations don't automatically update their uses you need to use the **PF2e Item Actions Module** to have that work
- Activations aren't disable when a player can't use them they just put an [X] in front of them
## Features
Adds and removes actions from your inventory when you equip item etc.. Do note, you are unable to save the state of items at the moment, I may refactor in the future to have it show you items in your inventory that aren't equipped etc, but that's a later me problem
### Supported Items
[Full List of Supported Items Here](https://github.com/chasarooniZ/pf2e-item-activations/blob/main/ITEMS.md)
## Settings
Coming Soon
## Language Support
Currently only supports the following languages:
- English

To add support for other languages you simply need to submit a PR for the `en.json` but in your chosen language based on the [language support listing for fvtt](https://foundryvtt.wiki/en/languages).
**Note** the translations under the code section in the translation __MUST MATCH THE SAME CAPITALIZATION AND MUST MATCH THE WORD USED IN YOUR TRANSLATION OF PF2e__. The capitalization + word matching are critical to allowing any of the automation for automatically generating activations to work.

## FAQ
**Q: Will you add support for \<Insert System Here\>?**

A: This module will only support the **PF2e** system

**Q: Will you support Pre Remaster versions of items?**

A: Don't plan on it, when I add homebrew support someone else can add support for them though!
