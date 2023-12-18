export function capitalizeString(string: string) {
    return string
        .replaceAll('_', ' ')
        .split(' ')
        .map(str => str[0].toUpperCase() + str.slice(1))
        .join(' ');
}