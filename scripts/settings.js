import { playAudioOneShot } from "./helpers.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export function registerSettings() {

    /* General Settings */
    /* ---------------- */
    game.settings.registerMenu("shadowdark-sounds", "customSettingsMenu", {
        name: game.i18n.localize("SDSOUNDS.settings_label_sound_configuration"),
        label: game.i18n.localize("SDSOUNDS.settings_label_sound_configuration"),
        hint: game.i18n.localize("SDSOUNDS.settings_hint_sound_configuration"),
        icon: "fas fa-volume-high",
        type: SoundConfigurationApp,
        restricted: true
    });

    game.settings.register("shadowdark-sounds", "shadowdark-sounds-enabled", {
		name: game.i18n.localize("SDSOUNDS.settings_label_enable_module"),
        hint: game.i18n.localize("SDSOUNDS.settings_hint_enable_module"),
        scope: "world",
        config: true,
		default: true,
		type: Boolean,
	});

    /* Torch Ignite Sound Settings */
    /* --------------------------- */
    game.settings.register("shadowdark-sounds", "torch-ignite-enabled", {
		name: "Play Torch Ignite Sound",
        scope: "world",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-ignite-sound", {
		name: "Torch Ignite Sound",
        scope: "world",
		config: false,
		type: String,
        default: "modules/shadowdark-sounds/assets/sounds/light-source-ignite.ogg",
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
        scope: "world",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-douse-sound", {
		name: "Torch Douse Sound",
        scope: "world",
		config: false,
		type: String,
        default: "modules/shadowdark-sounds/assets/sounds/light-source-douse.ogg",
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
        scope: "world",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-drop-sound", {
		name: "Torch Drop Sound",
        scope: "world",
		config: false,
		type: String,
        default: "modules/shadowdark-sounds/assets/sounds/light-source-drop.ogg",
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
        default: "modules/shadowdark-sounds/assets/sounds/light-source-pickup.ogg",
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

    /* Torch Expire Sound Settings */
    /* --------------------------- */
    game.settings.register("shadowdark-sounds", "torch-expire-enabled", {
		name: "Play Torch Expire Sound",
        scope: "client",
        config: false,
		default: true,
		type: Boolean,
	});

    game.settings.register("shadowdark-sounds", "torch-expire-sound", {
		name: "Torch Expire Sound",
        scope: "world",
		config: false,
		type: String,
        default: "modules/shadowdark-sounds/assets/sounds/light-source-expire.ogg",
        filePicker: true,
        requiresReload: true
	});

    game.settings.register("shadowdark-sounds", "torch-expire-volume", {
        name: "Torch Expire Volume",
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
        const torchIgniteTitle = game.i18n.localize("SDSOUNDS.torch_ignite_title");
        const torchIgniteHint = game.i18n.localize("SDSOUNDS.torch_ignite_hint");
        const torchIgniteEnabled = game.settings.get("shadowdark-sounds", "torch-ignite-enabled");
        const torchIgniteSound = game.settings.get("shadowdark-sounds", "torch-ignite-sound");
        const torchIgniteVolume = game.settings.get("shadowdark-sounds", "torch-ignite-volume");

        const torchDouseTitle = game.i18n.localize("SDSOUNDS.torch_douse_title");
        const torchDouseHint = game.i18n.localize("SDSOUNDS.torch_douse_hint");
        const torchDouseEnabled = game.settings.get("shadowdark-sounds", "torch-douse-enabled");
        const torchDouseSound = game.settings.get("shadowdark-sounds", "torch-douse-sound");
        const torchDouseVolume = game.settings.get("shadowdark-sounds", "torch-douse-volume");

        const torchDropTitle = game.i18n.localize("SDSOUNDS.torch_drop_title");
        const torchDropHint = game.i18n.localize("SDSOUNDS.torch_drop_hint");
        const torchDropEnabled = game.settings.get("shadowdark-sounds", "torch-drop-enabled");
        const torchDropSound = game.settings.get("shadowdark-sounds", "torch-drop-sound");
        const torchDropVolume = game.settings.get("shadowdark-sounds", "torch-drop-volume");

        const torchPickupTitle = game.i18n.localize("SDSOUNDS.torch_pickup_title");
        const torchPickupHint = game.i18n.localize("SDSOUNDS.torch_pickup_hint");
        const torchPickupEnabled = game.settings.get("shadowdark-sounds", "torch-pickup-enabled");
        const torchPickupSound = game.settings.get("shadowdark-sounds", "torch-pickup-sound");
        const torchPickupVolume = game.settings.get("shadowdark-sounds", "torch-pickup-volume");

        const torchExpireTitle = game.i18n.localize("SDSOUNDS.torch_expire_title");
        const torchExpireHint = game.i18n.localize("SDSOUNDS.torch_expire_hint");
        const torchExpireEnabled = game.settings.get("shadowdark-sounds", "torch-expire-enabled");
        const torchExpireSound = game.settings.get("shadowdark-sounds", "torch-expire-sound");
        const torchExpireVolume = game.settings.get("shadowdark-sounds", "torch-expire-volume");
        
        return {
            torchIgniteTitle,
            torchIgniteHint,
            torchIgniteEnabled,
            torchIgniteSound,
            torchIgniteVolume,

            torchDouseTitle,
            torchDouseHint,
            torchDouseEnabled,
            torchDouseSound,
            torchDouseVolume,

            torchDropTitle,
            torchDropHint,
            torchDropEnabled,
            torchDropSound,
            torchDropVolume,

            torchPickupTitle,
            torchPickupHint,
            torchPickupEnabled,
            torchPickupSound,
            torchPickupVolume,

            torchExpireTitle,
            torchExpireHint,
            torchExpireEnabled,
            torchExpireSound,
            torchExpireVolume,

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
            "torch-expire",
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

                    playAudioOneShot(soundPath, volume, false);
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