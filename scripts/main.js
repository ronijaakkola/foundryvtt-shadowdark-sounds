import { registerSettings } from "./settings.js";
import { playAudioOneShot } from "./helpers.js";

Hooks.once("init", async () => {
    if (!globalThis.libWrapper) {
        ui.notifications.error(game.i18n.localize("SDSOUNDS.init_libwrapper_error"));
        return;
    }

    await loadTemplates([
      "modules/shadowdark-sounds/templates/partials/sound-effect-fieldset.hbs",
    ]);

    registerSettings();

    // Hook to toggleLightSource
    libWrapper.register(
        "shadowdark-sounds",
        "game.system.apps.LightSourceTrackerSD.prototype.toggleLightSource",
        async function (wrapped, ...args) {
            const result = await wrapped.apply(this, args);
            console.log("SDSOUNDS | toggleLightSource");

            if (args[1]?.system.light.active) {
                if (game.settings.get("shadowdark-sounds", "torch-ignite-enabled")) {
                    playAudioOneShot(
                        game.settings.get("shadowdark-sounds", "torch-ignite-sound"),
                        game.settings.get("shadowdark-sounds", "torch-ignite-volume")
                    );
                }
            }
            else {
                if (game.settings.get("shadowdark-sounds", "torch-douse-enabled")) {
                    playAudioOneShot(
                        game.settings.get("shadowdark-sounds", "torch-douse-sound"),
                        0.5
                    );
                }
            }

            return result;
        },
        "WRAPPER"
    );

    // Hook to dropLightSourceOnScene
    libWrapper.register(
        "shadowdark-sounds",
        "game.system.apps.LightSourceTrackerSD.prototype.dropLightSourceOnScene",
        async function (wrapped, ...args) {
            const result = await wrapped.apply(this, args);
            console.log("SDSOUNDS | dropLightSourceOnScene");

            if (game.settings.get("shadowdark-sounds", "torch-drop-enabled")) {
                playAudioOneShot(
                    game.settings.get("shadowdark-sounds", "torch-drop-sound"),
                    game.settings.get("shadowdark-sounds", "torch-drop-volume")
                );
            }

            return result;
        },
        "WRAPPER"
    );

    /*
    // Hook to pickupLightSourceFromScene
    libWrapper.register(
        "shadowdark-sounds",
        "game.system.apps.LightSourceTrackerSD.prototype.pickupLightSourceFromScene",
        async function (wrapped, ...args) {
            const result = await wrapped.apply(this, args);
            console.log("SDSOUNDS | pickupLightSourceFromScene");

            if (game.settings.get("shadowdark-sounds", "torch-pickup-enabled")) {
                playAudioOneShot(
                    game.settings.get("shadowdark-sounds", "torch-pickup-sound"),
                    game.settings.get("shadowdark-sounds", "torch-pickup-volume")
                );
            }

            return result;
        },
        "WRAPPER"
    );
    */
});
