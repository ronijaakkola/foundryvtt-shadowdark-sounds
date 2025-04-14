import { playAudioOneShot } from "./helpers.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export function registerSettings() {

    /* General Settings */
    /* ---------------- */
    game.settings.registerMenu("shadowdark-sounds", "customSettingsMenu", {
        name: "Sound Configuration",
        label: "Configure Sounds",
        hint: "Configure which sound triggers to use, sound files, and volume.",
        icon: "fas fa-volume-high",
        type: SoundConfigurationApp,
        restricted: true
    });

    game.settings.register("shadowdark-sounds", "shadowdark-sounds-enabled", {
		name: "Enable Shadowdark Sounds",
        hint: "Configure whether or not sound effects are played for certain actions.",
        scope: "client",
        config: true,
		default: true,
		type: Boolean,
	});

    /* Torch Ignite Sound Settings */
    /* --------------------------- */
    game.settings.register("shadowdark-sounds", "torch-ignite-enabled", {
		name: "Play Torch Ignite Sound",
        scope: "client",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-ignite-sound", {
		name: "Torch Ignite Sound",
        scope: "world",
		config: false,
		type: String,
        filePicker: true,
        requiresReload: true
	});

    game.settings.register("shadowdark-sounds", "torch-ignite-volume", {
        name: "Torch Ignite Volume",
        scope: "world",
        config: false,
        type: Number,
        range: {
            min: 0.0,
            max: 1.0,
            step: 0.05
        },
        default: 0.5,
    });

    /* Torch Douse Sound Settings */
    /* -------------------------- */
    game.settings.register("shadowdark-sounds", "torch-douse-enabled", {
		name: "Play Torch Douse Sound",
        scope: "client",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-douse-sound", {
		name: "Torch Douse Sound",
        scope: "world",
		config: false,
		type: String,
        filePicker: true,
        requiresReload: true
	});

    game.settings.register("shadowdark-sounds", "torch-douse-volume", {
        name: "Torch Douse Volume",
        scope: "world",
        config: false,
        type: Number,
        range: {
            min: 0.0,
            max: 1.0,
            step: 0.05
        },
        default: 0.5,
    });

    /* Torch Drop Sound Settings */
    /* ------------------------- */
    game.settings.register("shadowdark-sounds", "torch-drop-enabled", {
		name: "Play Torch Drop Sound",
        scope: "client",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-drop-sound", {
		name: "Torch Drop Sound",
        scope: "world",
		config: false,
		type: String,
        filePicker: true,
        requiresReload: true
	});

    game.settings.register("shadowdark-sounds", "torch-drop-volume", {
        name: "Torch Drop Volume",
        scope: "world",
        config: false,
        type: Number,
        range: {
            min: 0.0,
            max: 1.0,
            step: 0.05
        },
        default: 0.5,
    });

    /* Torch Pickup Sound Settings */
    /* --------------------------- */
    game.settings.register("shadowdark-sounds", "torch-pickup-enabled", {
		name: "Play Torch Pickup Sound",
        scope: "client",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-pickup-sound", {
		name: "Torch Pickup Sound",
        scope: "world",
		config: false,
		type: String,
        filePicker: true,
        requiresReload: true
	});

    game.settings.register("shadowdark-sounds", "torch-pickup-volume", {
        name: "Torch Pickup Volume",
        scope: "world",
        config: false,
        type: Number,
        range: {
            min: 0.0,
            max: 1.0,
            step: 0.05
        },
        default: 0.5,
    });
}

class SoundConfigurationApp extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "shadowdark-sounds-settings",
        form: {
            handler: SoundConfigurationApp.#onSubmit,
            closeOnSubmit: true,
        },
        position: {
            width: 640,
            height: "auto",
        },
        tag: "form",
        window: {
            icon: "fas fa-volume-high",
            title: "Sound Configuration"
        },
        classes: ["standard-form"]
    }

    get title() {
        return "Sound Configuration";
    }

    static PARTS = {
        config: {
            template: "modules/shadowdark-sounds/templates/settings.hbs"
        },
        footer: {
            template: "templates/generic/form-footer.hbs",
        },
    }

    _prepareContext(options) {
        const torchIgniteEnabled = game.settings.get("shadowdark-sounds", "torch-ignite-enabled");
        const torchIgniteSound = game.settings.get("shadowdark-sounds", "torch-ignite-sound");
        const torchIgniteVolume = game.settings.get("shadowdark-sounds", "torch-ignite-volume");

        const torchDouseEnabled = game.settings.get("shadowdark-sounds", "torch-douse-enabled");
        const torchDouseSound = game.settings.get("shadowdark-sounds", "torch-douse-sound");
        const torchDouseVolume = game.settings.get("shadowdark-sounds", "torch-douse-volume");

        const torchDropEnabled = game.settings.get("shadowdark-sounds", "torch-drop-enabled");
        const torchDropSound = game.settings.get("shadowdark-sounds", "torch-drop-sound");
        const torchDropVolume = game.settings.get("shadowdark-sounds", "torch-drop-volume");

        const torchPickupEnabled = game.settings.get("shadowdark-sounds", "torch-pickup-enabled");
        const torchPickupSound = game.settings.get("shadowdark-sounds", "torch-pickup-sound");
        const torchPickupVolume = game.settings.get("shadowdark-sounds", "torch-pickup-volume");
        
        return {
            torchIgniteEnabled,
            torchIgniteSound,
            torchIgniteVolume,

            torchDouseEnabled,
            torchDouseSound,
            torchDouseVolume,

            torchDropEnabled,
            torchDropSound,
            torchDropVolume,

            torchPickupEnabled,
            torchPickupSound,
            torchPickupVolume,

            buttons: [
                { type: "submit", icon: "fa-solid fa-save", label: "SETTINGS.Save" }
            ]
        }
    }

    _onRender(context, options) {
        const soundPrefixes = [
            "torch-ignite",
            "torch-douse",
            "torch-drop",
            "torch-pickup",
        ];

        for (const prefix of soundPrefixes) {
            const testButton = this.element.querySelector(`.test-${prefix}-sound`);
            const soundInput = this.element.querySelector(`file-picker[name="${prefix}-sound"]`);
            const volumeInput = this.element.querySelector(`input[name="${prefix}-volume"]`);
            const volumeLabel = this.element.querySelector(`.range-value[data-for="${prefix}-volume"]`);
            const checkbox = this.element.querySelector(`input[name="${prefix}-enabled"]`);
            const optionsSection = this.element.querySelector(`#${prefix}-options`);

            // Handle play test sound button
            if (testButton && soundInput && volumeInput) {
                testButton.addEventListener("click", () => {
                    const soundPath = soundInput.value;
                    const volume = parseFloat(volumeInput.value ?? "0.5");

                    if (!soundPath) {
                        ui.notifications.warn("No sound file selected.");
                        return;
                    }

                    playAudioOneShot(soundPath, volume);
                });
            }

            // Handle volume slider update
            if (volumeInput && volumeLabel) {
                volumeInput.addEventListener("input", () => {
                    volumeLabel.textContent = volumeInput.value;
                });
            }

            // Handle collapsible fieldset
            if (checkbox && optionsSection) {
                optionsSection.classList.toggle("collapsed", !checkbox.checked);

                checkbox.addEventListener("change", () => {
                    optionsSection.classList.toggle("collapsed", !checkbox.checked);
                });
            }
        }
    }

    static async #onSubmit(event, form, formData) { 
        const settings = foundry.utils.expandObject(formData.object);
        await Promise.all(
            Object.entries(settings)
                .map(([key, value]) => game.settings.set("shadowdark-sounds", key, value))
        );
    }
};