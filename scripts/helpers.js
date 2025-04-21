function countActiveLightSources() {
    return game.shadowdark.lightSourceTracker.monitoredLightSources
        .filter(light => light.lightSources && light.lightSources.length > 0)
        .length;
}

export function isTheLastLightSource() {
    const activeLightSources = countActiveLightSources();
    return activeLightSources === 1;
}