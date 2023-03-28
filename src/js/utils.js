const MOBILE = 1;
const TABLET = 2;
const DESKTOP = 3;

export function getMedia() {
    if (
        //window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches
        window.matchMedia('(max-width: 767px)').matches
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

export function getPageStartIndex(page, itemsPerPage) {
    return (page - 1) * itemsPerPage;
}

export function calculateLimit(index, offset, defaultLimit = 20) {
    const limit =
        Math.ceil(Math.abs((index - offset) / defaultLimit)) * defaultLimit;
    console.log(index, offset, limit);
    return limit === 0 ? defaultLimit : limit;
}

export function formatDate(date) {
    const tmpDate = new Date(date);

    const formatDate = `${String(tmpDate.getDate()).padStart(2, '0')}-${String(
        tmpDate.getMonth() + 1
    ).padStart(2, '0')}-${tmpDate.getFullYear()}`;

    return formatDate;
}
