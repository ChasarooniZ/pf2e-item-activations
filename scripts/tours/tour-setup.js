export const TOUR_BASICS = {
    namespace: "pf2e-item-activations",
    id: "basic-tour",
    title: "PF2e Item Activations Basic",
    steps: [],
};
export const TOURS = {
    //Basic Tour
    "11.2.0": {
        first: true,
        steps: [
            {
                selector: '[data-tab="settings"]',
                title: "Item Activations",
                content:
                    "Welcome to item activations, the basic usage is to drag said item to your inventory, but first we're going to walk you through the setup",
                action: "click",
            },
            {
                selector: '[data-action="configure"]',
                title: "Action Explanation",
                content:
                    "When items with activations are added to a character's inventory , they create activation actions in the actions area. (Note if the item isn't currently properly equipped, the activations will have an [X]",
                action: "click",
            },
            {
                title: "Settings",
                selector: '[data-tab="pf2e-item-activations"]',
                content: "Here are the settings for all configuration for this module",
                action: "click",
            },
            {
                title: "Settings",
                selector: "section.tab.category.active",
                content: "Make sure to configure these settings to your liking",
            },
        ],
    },
};

export const TOUR_LIST = Object.keys(TOURS);
