export function playAudio(soundName, token = null) {
    if (!game.settings.get("shadowdark-sounds", "shadowdark-sounds-enabled")) {
        return result;
    }

    if (!soundName) return;

    const soundPath = game.settings.get("shadowdark-sounds", `${soundName}-sound`);
    const soundVolume = game.settings.get("shadowdark-sounds", `${soundName}-volume`);

    const positionalAudioEnabled = game.settings.get("shadowdark-sounds", "shadowdark-enable-positional-audio");
    
    if (positionalAudioEnabled && token) {
        playPositionalAudioOneShot(token, soundPath, soundVolume);
    } else {
        playAudioOneShot(soundPath, soundVolume);
    }
}

export function playAudioOneShot(soundPath, volume, push = true) {
    if (!soundPath) return;

    foundry.audio.AudioHelper.play({
        src: soundPath,
        volume: volume ?? 0.5,
        loop: false,
        autoplay: true,
    }, push)
}

export async function playPositionalAudioOneShot(token, soundPath, volume = 0.5) {
    if (!token || !soundPath) return;

    // Get the center position of the token in scene coordinates
    const { x, y } = token.center;

    // Preload the sound to get its duration
    const sound = await foundry.audio.AudioHelper.preloadSound(soundPath);
    if (!sound) return;

    const duration = sound.duration;

    // Create a temporary ambient sound at the token's position
    const soundDoc = await AmbientSoundDocument.create({
        t: "l",
        x,
        y,
        radius: 30,
        path: soundPath,
        volume,
        repeat: false,
        hidden: false,
        easing: true,
        fade: 0,
        autoplay: true
    }, { parent: canvas.scene });

    if (duration) {
        setTimeout(() => {
            soundDoc.delete();
        }, duration * 1000); // add a little buffer
    }
}

export function getToken(actorId) {
    const tokens = canvas.tokens.placeables.filter(t => t.actor?.id === actorId);
    if (tokens.length > 0) {
        if (tokens.length > 1) {
            console.warn("Multiple tokens found for actor ID:", actorId);
        }

        return tokens[0];
    }

    return null;
}