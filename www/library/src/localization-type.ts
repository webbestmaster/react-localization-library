import {FC, ReactNode} from 'react';

export type LocaleContextValueMapType = Record<string, ReactNode>;
export type LocaleContextStringMapType = Record<string, number | string>;

export type LocaleContextType<TranslationKeys extends string, LocaleName extends string> = {
    getLocalizedString: (stringKey: TranslationKeys, valueMap?: LocaleContextStringMapType) => string;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};

export type ProviderPropsType = {
    children: ReactNode;
};

export type LocalePropsType<TranslationKeys extends string> = {
    stringKey: TranslationKeys;
    valueMap?: LocaleContextValueMapType;
};

export type LocalizationStateType<LocaleName extends string> = {
    localeName: LocaleName;
};

export type LocalizationConfigType<TranslationKeys extends string, LocaleName extends string> = {
    defaultLocaleName: LocaleName;
    localization: Record<LocaleName, Record<TranslationKeys, string>>;
    onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
};

export type LocalizationLibraryType<TranslationKeys extends string, LocaleName extends string> = {
    Locale: FC<LocalePropsType<TranslationKeys>>;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
};
