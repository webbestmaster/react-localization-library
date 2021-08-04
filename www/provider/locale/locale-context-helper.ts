/* global localStorage, navigator */

import {getEnumValueEnsure} from '../../util/enum';

import {localeConst} from './locale-context-const';
import {LocaleNameEnum, ShortLocaleNameEnum} from './locale-context-type';

// eslint-disable-next-line complexity
export function getSavedLocaleName<LocaleName extends string>(localeNameList: Array<LocaleName>): LocaleName {
    const [defaultLocaleName] = localeNameList;

    if (typeof localStorage === 'undefined' || typeof navigator === 'undefined') {
        return defaultLocaleName;
    }

    const savedLocaleName = localStorage.getItem(localeConst.key.localStorage.localeName);

    // eslint-disable-next-line no-loops/no-loops
    for (const localeNameInList of localeNameList) {
        if (localeNameInList === savedLocaleName) {
            return localeNameInList;
        }
    }

    const navigatorLanguages = navigator.languages;

    // eslint-disable-next-line no-loops/no-loops
    for (const deviceLocaleName of navigatorLanguages) {
        // eslint-disable-next-line no-loops/no-loops
        for (const localeNameInList of localeNameList) {
            if (deviceLocaleName === localeNameInList) {
                return localeNameInList;
            }
        }
    }

    return defaultLocaleName;
}

export function saveLocaleName<LocaleName extends string>(localeName: LocaleName): LocaleName {
    console.log('---> save localeName localStorage:', localeConst.key.localStorage.localeName, localeName);
    localStorage.setItem(localeConst.key.localStorage.localeName, localeName);

    return localeName;
}

export function getShortLocaleName(localeName: LocaleNameEnum): ShortLocaleNameEnum {
    const [mayBeShortLocaleName] = localeName.split('-');

    return getEnumValueEnsure<ShortLocaleNameEnum>(
        ShortLocaleNameEnum,
        mayBeShortLocaleName,
        localeConst.defaults.shortLocaleName
    );
}
