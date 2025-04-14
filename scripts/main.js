import { registerSettings } from "./settings.js";
import { registerHooks } from "./hooks.js";

Hooks.once("init", async () => {
    if (!globalThis.libWrapper) {
        ui.notifications.error(game.i18n.localize("SDSOUNDS.error_init_libwrapper"));
        return;
    }

    await loadTemplates([
      "modules/shadowdark-sounds/templates/partials/sound-effect-fieldset.hbs",
    ]);

    registerSettings();

    registerHooks();
});
