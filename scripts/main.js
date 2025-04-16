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
});

Hooks.once("ready", async () => {
  // For now, this only runs for the GM and
  // the GM broadcasts sounds to everybody
  if (!game.user.isGM) return;

  registerHooks();
});
