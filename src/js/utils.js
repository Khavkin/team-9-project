const MOBILE = 1;
const TABLET = 2;
const DESKTOP = 3;

export function getMedia() {
    if (
        window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches
    ) {
        return MOBILE;
    } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches
    ) {
        return TABLET;
    } else {
        return DESKTOP;
    }
}

export function normalizeImportFileName(fileName) {
    return fileName.indexOf('?') >= 0
        ? fileName.slice(0, fileName.indexOf('?'))
        : fileName;
}
