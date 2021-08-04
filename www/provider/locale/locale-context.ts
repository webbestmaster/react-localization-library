import {createLocalization, LocalizationStateType} from '../../library/library';


import {getSavedLocaleName, saveLocaleName} from './locale-context-helper';
import {LocaleNameEnum} from './locale-context-type';
import {LangKeyType} from './translation/type';
import {allLocalesData} from './locale-context-const';

const {LocalizationProvider, Locale, useLocale} = createLocalization<LangKeyType, LocaleNameEnum>({
    defaultLocaleName: getSavedLocaleName<LocaleNameEnum>(Object.values(LocaleNameEnum)),
    localization: allLocalesData,
    onUseEffect: (localizationProviderState: LocalizationStateType<LocaleNameEnum>) => {
        const {localeName} = localizationProviderState;

        saveLocaleName<LocaleNameEnum>(localeName);
    },
});

export {Locale, useLocale, LocalizationProvider};
