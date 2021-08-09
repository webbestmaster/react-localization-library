import { FC, ReactNode } from 'react';
export declare type LocaleContextValueMapType = Record<string, ReactNode>;
export declare type LocaleContextStringMapType = Record<string, number | string>;
export declare type LocaleContextType<TranslationKeys extends string, LocaleName extends string> = {
    getLocalizedString: (stringKey: TranslationKeys, valueMap?: LocaleContextStringMapType) => string;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};
export declare type ProviderPropsType = {
    children: ReactNode;
};
export declare type LocalePropsType<TranslationKeys extends string> = {
    stringKey: TranslationKeys;
    valueMap?: LocaleContextValueMapType;
};
export declare type LocalizationStateType<LocaleName extends string> = {
    localeName: LocaleName;
};
export declare type LocalizationConfigType<TranslationKeys extends string, LocaleName extends string> = {
    defaultLocaleName: LocaleName;
    localization: Record<LocaleName, Record<TranslationKeys, string>>;
    onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
};
export declare type LocalizationLibraryType<TranslationKeys extends string, LocaleName extends string> = {
    Locale: FC<LocalePropsType<TranslationKeys>>;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
};
