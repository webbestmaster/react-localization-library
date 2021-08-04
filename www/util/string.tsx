import {ShortLocaleNameEnum} from '../provider/locale/locale-context-type';

export function getHash(data: Array<unknown> | Record<string, unknown> | string): string {
    let result = 0;
    const fullString: string = typeof data === 'string' ? data : JSON.stringify(data, null, 0);
    const stringLength = fullString.length;

    // eslint-disable-next-line no-loops/no-loops
    for (let index = 0; index < stringLength; index += 1) {
        result = Math.trunc(Math.imul(31, result) + fullString.charCodeAt(index));
    }

    return result.toString(32);
}

export function getRandomString(): string {
    return getHash(String(Math.random()).replace('0.', ''));
}

export function findString(input: string, searchQuery: string, flags: '' | 'g' | 'gi' = 'gi'): Array<string> {
    const result: Array<string> = [];
    const searchQueryLength = searchQuery.length;

    const splitRegExp = new RegExp('(?=' + searchQuery + ')', flags);
    const equalRegExp = new RegExp('^' + searchQuery, flags);

    const splitLeftList: Array<string> = input.split(splitRegExp);

    // eslint-disable-next-line no-loops/no-loops
    for (const leftSplitPart of splitLeftList) {
        if (equalRegExp.test(leftSplitPart)) {
            result.push(leftSplitPart.slice(0, searchQueryLength), leftSplitPart.slice(searchQueryLength));
        } else {
            result.push(leftSplitPart);
        }
    }

    return result;
}

export function sortCompare(shortLocaleName: ShortLocaleNameEnum, stringA: string, stringB: string): number {
    return new Intl.Collator(shortLocaleName).compare(stringA, stringB);
}

export function toTrimmedString(value: unknown): string {
    if (value === null || typeof value === 'undefined') {
        return '';
    }

    return String(value).trim();
}
