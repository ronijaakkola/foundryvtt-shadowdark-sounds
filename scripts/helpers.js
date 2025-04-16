export function playAudioOneShot(soundPath, volume, push = true) {
    if (!soundPath) return;

    foundry.audio.AudioHelper.play({
        src: soundPath,
        volume: volume ?? 0.5,
        loop: false,
        autoplay: true,
    }, push)
}