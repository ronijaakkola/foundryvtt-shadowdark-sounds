export function playAudio(soundName) {
    if (!game.settings.get("shadowdark-sounds", "shadowdark-sounds-enabled")) {
        return result;
    }

    if (!soundName) return;

    const soundPath = game.settings.get("shadowdark-sounds", `${soundName}-sound`);
    const soundVolume = game.settings.get("shadowdark-sounds", `${soundName}-volume`);

    playAudioOneShot(soundPath, soundVolume, true);
}

export function playAudioOneShot(soundPath, volume, pushToPlayers = true) {
    if (!soundPath) return;

    foundry.audio.AudioHelper.play({
        src: soundPath,
        volume: volume ?? 0.5,
        loop: false,
        autoplay: true,
    }, pushToPlayers)
}