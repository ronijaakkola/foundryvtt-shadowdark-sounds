export function playAudioOneShot(soundPath, volume) {
    foundry.audio.AudioHelper.play({
        src: soundPath,
        volume: volume,
        autoplay: true,
    }, false)
}