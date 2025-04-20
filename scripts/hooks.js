import { playAudio, playAudioOneShot, playPositionalAudioOneShot, getToken } from "./helpers.js";

export function registerHooks() {

    // LightSourceTrackerSD.toggleLightSource
    // This is called when a light source is toggled on or off
    libWrapper.register(
        "shadowdark-sounds",
        "game.system.apps.LightSourceTrackerSD.prototype.toggleLightSource",
        async function (wrapped, ...args) {
            const result = await wrapped.apply(this, args);
            const token = getToken(args[1]?.actor?.id);

            if (args[1]?.system.light.active) {
                playAudio("torch-ignite", token);
            }
            else {
                playAudio("torch-douse", token);
            }

            return result;
        },
        "WRAPPER"
    );

    // LightSourceTrackerSD.dropLightSourceOnScene
    // This is called when a light source is dropped on the scene
    libWrapper.register(
        "shadowdark-sounds",
        "game.system.apps.LightSourceTrackerSD.prototype.dropLightSourceOnScene",
        async function (wrapped, ...args) {
            const result = await wrapped.apply(this, args);
            
            if (!game.settings.get("shadowdark-sounds", "shadowdark-sounds-enabled")) {
                return result;
            }

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

    // LightSourceTrackerSD.pickupLightSourceFromScene
    // This is called when a light source is picked up from the scene
    libWrapper.register(
        "shadowdark-sounds",
        "game.system.apps.LightSourceTrackerSD.prototype.pickupLightSourceFromScene",
        async function (wrapped, ...args) {
            const result = await wrapped.apply(this, args);
            
            if (!game.settings.get("shadowdark-sounds", "shadowdark-sounds-enabled")) {
                return result;
            }

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

    // ActorSD.yourLightExpired
    // This is called when a light source expires
    libWrapper.register(
        "shadowdark-sounds",
        "game.system.documents.ActorSD.prototype.yourLightExpired",
        async function (wrapped, ...args) {
            const result = await wrapped.apply(this, args);
            
            if (!game.settings.get("shadowdark-sounds", "shadowdark-sounds-enabled")) {
                return result;
            }

            if (game.settings.get("shadowdark-sounds", "torch-expire-enabled")) {
                playAudioOneShot(
                    game.settings.get("shadowdark-sounds", "torch-expire-sound"),
                    game.settings.get("shadowdark-sounds", "torch-expire-volume")
                );
            }

            return result;
        },
        "WRAPPER"
    );
}