/*
import {ReactNode} from 'react';

import {createLocalization, LocalizationStateType} from '../../library/library';

import {ExtractKeysType} from '../../library/src/localization-type';

import {getSavedLocaleName, saveLocaleName} from './locale-context-helper';
import {LocaleNameEnum} from './locale-context-type';
import {LangKeyType} from './translation/type';
import {allLocalesData} from './locale-context-const';
import {enUs} from './translation/en-us/data';
import {ruRu} from './translation/ru-ru/data';

type LocaleKeysType = keyof typeof enUs & keyof typeof ruRu;

type ValuesMapType = {
    [key in LocaleKeysType]: ExtractKeysType<typeof enUs[key], ReactNode> &
        ExtractKeysType<typeof ruRu[key], ReactNode>;
};

const {LocalizationProvider, Locale, useLocale} = createLocalization<LangKeyType, LocaleNameEnum, ValuesMapType>({
    defaultLocaleName: getSavedLocaleName<LocaleNameEnum>(Object.values(LocaleNameEnum)),
    localization: allLocalesData,
    onUseEffect: (localizationProviderState: LocalizationStateType<LocaleNameEnum>) => {
        const {localeName} = localizationProviderState;

        saveLocaleName<LocaleNameEnum>(localeName);
    },
});
*/

// export {Locale, useLocale, LocalizationProvider};
