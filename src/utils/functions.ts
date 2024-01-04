export function capitalizeString(string: string) {
    if (!string) return null;
    return string
        .replaceAll('_', ' ')
        .split(' ')
        .map(str => str[0].toUpperCase() + str.slice(1))
        .join(' ');
}

/**Formats dates in the format YYYY-MM-dd to dd-MM-YYYY */
export function formatDate(date: string) {
    const d = date.split("-");
    return `${d[2]}/${d[1]}/${d[0]}`;
}