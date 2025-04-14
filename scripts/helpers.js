export function playAudioOneShot(soundPath, volume) {
    if (!soundPath) return;

    foundry.audio.AudioHelper.play({
        src: soundPath,
        volume: volume ?? 0.5,
        loop: false,
        autoplay: true,
    }, false)
}