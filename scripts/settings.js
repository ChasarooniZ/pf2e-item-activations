Hooks.on("init", () => {

    game.settings.register("pf2e-item-activations", "enabled", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.enabled.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.enabled.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register("pf2e-item-activations", "debug-mode", {
        name: game.i18n.localize("pf2e-item-activations.module-settings.debug-mode.name"),
        hint: game.i18n.localize("pf2e-item-activations.module-settings.debug-mode.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
});
