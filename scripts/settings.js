// Define settings for the PF2E Item Activations module
Hooks.on("init", () => {
    // Register setting for enabling/disabling the module
    game.settings.register("pf2e-item-activations", "enabled", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.enabled.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.enabled.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    // Register setting for enabling/disabling NPC activations
    game.settings.register("pf2e-item-activations", "action-type-icon", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.action-type-icon.enabled.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.action-type-icon.enabled.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    // Register setting for enabling/disabling NPC activations
    game.settings.register("pf2e-item-activations", "npc.enabled", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.npc.enabled.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.npc.enabled.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    // Register setting for enabling/disabling NPC activations on token creation
    game.settings.register("pf2e-item-activations", "npc.on-create-token", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.npc.on-create-token.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.npc.on-create-token.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    // Register setting for enabling/disabling auto-generation of activations
    game.settings.register("pf2e-item-activations", "auto-gen.enabled", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.auto-gen.enabled.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.auto-gen.enabled.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    // Register setting for enabling/disabling debug mode
    game.settings.register("pf2e-item-activations", "debug-mode", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.debug-mode.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.debug-mode.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });


    game.settings.register("pf2e-item-activations", "last-version", {
        scope: "world",
        config: false,
        default: "0.0.0",
        type: String,
    });
});
