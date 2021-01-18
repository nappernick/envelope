export const calculateZoom = (latDiff, longDiff) => {
    let viewZoom = 15
    if (latDiff > .004 || longDiff > .007) viewZoom = 14.9
    if (longDiff > .01) viewZoom = 14.8
    if (latDiff > .003 || longDiff > .003) viewZoom = 14.6
    if (latDiff > .005) viewZoom = 14.2
    if (latDiff > longDiff && latDiff - longDiff > .005) viewZoom = 13.8
    if (longDiff > .007) viewZoom = 13.6
    if (latDiff > .007) viewZoom = 12.8
    if (latDiff > .01) viewZoom = 13.5
    if (latDiff > .015) viewZoom = 13.3
    if (latDiff > .04 || longDiff > .04) viewZoom = 12.6
    return viewZoom
}
