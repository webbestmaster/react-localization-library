import {Fragment, ReactNode} from 'react';

import {splitValueStringRegExp} from './localization-const';

function replacePlaceholderMap(rawString: string, valueMap: Record<string, string>): string {
    let resultString = rawString;

    const keyList = Object.keys(valueMap);

    // eslint-disable-next-line no-loops/no-loops
    for (const objectKey of keyList) {
        resultString = resultString.replace(new RegExp('{' + objectKey + '}', 'g'), valueMap[objectKey]);
    }

    return resultString;
}

export function getLocalizedString<TranslationKeys extends string, LocaleName extends string>(
    stringKey: TranslationKeys,
    localeName: LocaleName,
    localization: Record<LocaleName, Record<TranslationKeys, string>>,
    valueMap?: Record<string, string>
): string {
    const resultString = localization[localeName][stringKey];

    return valueMap ? replacePlaceholderMap(resultString, valueMap) : resultString;
}

export function getLocalizedComponentHelper<TranslationKeys extends string, LocaleName extends string>(
    stringKey: TranslationKeys,
    localeName: LocaleName,
    localization: Record<LocaleName, Record<TranslationKeys, string>>,
    valueMap: Record<string, ReactNode>
): Array<JSX.Element | string> {
    const resultString = localization[localeName][stringKey]; // 'the {value1} data {value2} is {value2} here'

    let partList: Array<JSX.Element | string> = resultString.split(splitValueStringRegExp); // ["the ", "{value1} data ", "{value2} is ", "{value2} here"]

    const keyList = Object.keys(valueMap);

    // eslint-disable-next-line no-loops/no-loops
    for (const objectKey of keyList) {
        partList = partList.map((part: JSX.Element | string, index: number): JSX.Element | string => {
            if (typeof part !== 'string') {
                return part;
            }

            const replacedPart = '{' + objectKey + '}';

            if (!part.startsWith(replacedPart)) {
                return part;
            }

            const endOfString = part.slice(replacedPart.length);

            return (
                <Fragment key={String(objectKey + '-' + index)}>
                    {valueMap[objectKey]}
                    {endOfString}
                </Fragment>
            );
        });
    }

    return partList;
}
