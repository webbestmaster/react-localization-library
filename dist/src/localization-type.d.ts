import { FC, ReactNode } from 'react';
export declare type LocaleContextType<TranslationKeys extends string, LocaleName extends string> = {
    getLocalizedString: (stringKey: TranslationKeys, valueMap?: Record<string, string>) => string;
    isFetchingLocaleData: boolean;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};
export declare type ProviderPropsType = {
    children: ReactNode;
};
export declare type LocalePropsType<TranslationKeys extends string> = {
    stringKey: TranslationKeys;
    valueMap?: Record<string, ReactNode>;
};
export declare type LocalizationStateType<LocaleName extends string> = {
    isFetchingLocaleData: boolean;
    localeName: LocaleName;
};
export declare type LocalizationDataType<TranslationKeys extends string> = Record<TranslationKeys, string>;
export declare type LocalizationDataLoaderType<TranslationKeys extends string> = () => Promise<LocalizationDataType<TranslationKeys>>;
export declare type RawLocalizationDataType<TranslationKeys extends string> = LocalizationDataLoaderType<TranslationKeys> | LocalizationDataType<TranslationKeys>;
export declare type LocalizationType<LocaleName extends string, TranslationKeys extends string> = Record<LocaleName, RawLocalizationDataType<TranslationKeys>>;
export declare type LocalizationConfigType<TranslationKeys extends string, LocaleName extends string> = {
    defaultLocaleName: LocaleName;
    localization: LocalizationType<LocaleName, TranslationKeys>;
    onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
};
export declare type LocalizationLibraryType<TranslationKeys extends string, LocaleName extends string> = {
    Locale: (props: LocalePropsType<TranslationKeys>) => JSX.Element;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
};
