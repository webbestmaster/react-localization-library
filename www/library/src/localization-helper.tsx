/* eslint-disable capitalized-comments */

import {Fragment, type JSX, type ReactNode} from "react";

import {splitValueStringRegExp} from "./localization-const";
import type {LocalizationDataType, LocalizationType, RawLocalizationDataType} from "./localization-type";

function replacePlaceholderMap(rawString: string, valueMap: Readonly<Record<string, string>>): string {
    let resultString = rawString;

    const keyList = Object.keys(valueMap);

    for (const objectKey of keyList) {
        resultString = resultString.replace(new RegExp(`\\{${objectKey}\\}`, "gu"), valueMap[objectKey]);
    }

    return resultString;
}

// eslint-disable-next-line @typescript-eslint/max-params, @typescript-eslint/no-unnecessary-type-parameters, @typescript-eslint/no-unnecessary-type-parameters
export function getLocalizedString<TranslationKeys extends string, LocaleName extends string>(
    stringKey: TranslationKeys,
    localeName: LocaleName,
    localization: LocalizationDataType<TranslationKeys>,
    valueMap?: Readonly<Record<string, string>>
): string {
    // const localizationData = localization[localeName];

    // if (typeof localizationData === 'function') {
    //     return 'TEXT';
    // }

    const resultString = localization[stringKey];

    return valueMap ? replacePlaceholderMap(resultString, valueMap) : resultString;
}

// eslint-disable-next-line @typescript-eslint/max-params, @typescript-eslint/no-unnecessary-type-parameters
export function getLocalizedComponentHelper<TranslationKeys extends string, LocaleName extends string>(
    stringKey: TranslationKeys,
    localeName: LocaleName,
    localization: LocalizationDataType<TranslationKeys>,
    valueMap: Record<string, ReactNode>
): Array<JSX.Element | string> {
    const resultString = localization[stringKey]; // 'the {value1} data {value2} is {value2} here'

    let partList: Array<JSX.Element | string> = resultString.split(splitValueStringRegExp); // ["the ", "{value1} data ", "{value2} is ", "{value2} here"]

    const keyList = Object.keys(valueMap);

    for (const objectKey of keyList) {
        partList = partList.map((part: Readonly<JSX.Element> | string, index: number): JSX.Element | string => {
            if (typeof part !== "string") {
                return part;
            }

            const replacedPart = `{${objectKey}}`;

            if (!part.startsWith(replacedPart)) {
                return part;
            }

            const endOfString = part.slice(replacedPart.length);

            return (
                <Fragment key={String(`${objectKey}-${index}`)}>
                    {valueMap[objectKey]}
                    {endOfString}
                </Fragment>
            );
        });
    }

    return partList;
}

export async function fetchLocalizationData<LocaleName extends string, TranslationKeys extends string>(
    localeName: LocaleName,
    localization: LocalizationType<LocaleName, TranslationKeys>
): Promise<LocalizationDataType<TranslationKeys>> {
    const localizationData: RawLocalizationDataType<TranslationKeys> = localization[localeName];

    if (typeof localizationData === "function") {
        return localizationData();
    }

    return localizationData;
}
