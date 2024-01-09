import { format } from "date-fns";

export const defaultClientDateTime = "dd/MM/yyyy HH:mm";
export const defaultDatabseDateTime = "yyyy-MM-dd'T'HH:mm:ss";

export function capitalizeString(string: string) {
    if (!string) return null;
    return string
        .replaceAll('_', ' ')
        .split(' ')
        .map(str => str[0].toUpperCase() + str.slice(1))
        .join(' ');
}

/**Formats a date time string to a given pattern.
 *@see https://date-fns.org/v3.1.0/docs/format for a list accepted patterns*/
export function formatDateTime( dateTime: string, pattern?: string) {
    return format(dateTime, (pattern || defaultClientDateTime));
}

/**Returns current date time in the format yyyy-MM-ddTHH:mm:ss. An additional options argument can be passed.
 * @param options.formatToDatabase Boolean. If true or undefined, formatDateTime will return a datetime string with the formatted with the defaultDatabseDateTime constant.
 * @param options.pattern Pattern string. If passed, formatDateTime will return a datetime string formatted with the given pattern.
 * @see https://date-fns.org/v3.1.0/docs/format for a list accepted patterns.
 * @return current datetime string
*/
export function currentDateTime(
    options?: { formatToDatabase?: boolean, pattern?: string }
) {
    return (options?.formatToDatabase === undefined || options?.formatToDatabase === true)
        ? format(new Date().toString(), options?.pattern || defaultDatabseDateTime)
        : new Date().toString();
}