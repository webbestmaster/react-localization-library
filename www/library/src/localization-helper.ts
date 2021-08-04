import {LocaleContextValueMapType} from './localization-type';

function replacePlaceholderMap(rawString: string, valueMap: LocaleContextValueMapType): string {
    let resultString = rawString;

    const keyList = Object.keys(valueMap);

    // eslint-disable-next-line no-loops/no-loops
    for (const objectKey of keyList) {
        resultString = resultString.replace(new RegExp('{' + objectKey + '}', 'g'), String(valueMap[objectKey]));
    }

    return resultString;
}

export function getLocalizedString<TranslationKeys extends string, LocaleName extends string>(
    stringKey: TranslationKeys,
    localeName: LocaleName,
    localization: Record<LocaleName, Record<TranslationKeys, string>>,
    valueMap?: LocaleContextValueMapType
): string {
    const resultString = localization[localeName][stringKey];

    return valueMap ? replacePlaceholderMap(resultString, valueMap) : resultString;
}
