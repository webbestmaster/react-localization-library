import { jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable capitalized-comments */
import { Fragment } from "react";
import { splitValueStringRegExp } from "./localization-const";
function replacePlaceholderMap(rawString, valueMap) {
    let resultString = rawString;
    const keyList = Object.keys(valueMap);
    for (const objectKey of keyList) {
        resultString = resultString.replace(new RegExp(`\\{${objectKey}\\}`, "gu"), valueMap[objectKey]);
    }
    return resultString;
}
// eslint-disable-next-line @typescript-eslint/max-params
export function getLocalizedString(stringKey, localeName, localization, valueMap) {
    // const localizationData = localization[localeName];
    // if (typeof localizationData === 'function') {
    //     return 'TEXT';
    // }
    const resultString = localization[stringKey];
    return valueMap ? replacePlaceholderMap(resultString, valueMap) : resultString;
}
// eslint-disable-next-line @typescript-eslint/max-params
export function getLocalizedComponentHelper(stringKey, localeName, localization, valueMap) {
    const resultString = localization[stringKey]; // 'the {value1} data {value2} is {value2} here'
    let partList = resultString.split(splitValueStringRegExp); // ["the ", "{value1} data ", "{value2} is ", "{value2} here"]
    const keyList = Object.keys(valueMap);
    for (const objectKey of keyList) {
        partList = partList.map((part, index) => {
            if (typeof part !== "string") {
                return part;
            }
            const replacedPart = `{${objectKey}}`;
            if (!part.startsWith(replacedPart)) {
                return part;
            }
            const endOfString = part.slice(replacedPart.length);
            return (_jsxs(Fragment, { children: [valueMap[objectKey], endOfString] }, String(`${objectKey}-${index}`)));
        });
    }
    return partList;
}
export async function fetchLocalizationData(localeName, localization) {
    const localizationData = localization[localeName];
    if (typeof localizationData === "function") {
        return localizationData();
    }
    return localizationData;
}
//# sourceMappingURL=localization-helper.js.map