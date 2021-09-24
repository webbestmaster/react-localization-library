import {FC, ReactNode} from 'react';

export type LocaleContextType<TranslationKeys extends string, LocaleName extends string> = {
    getLocalizedString: (stringKey: TranslationKeys, valueMap?: Record<string, string>) => string;
    isFetchingLocaleData: boolean;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};

export type ProviderPropsType = {
    children: ReactNode;
};

export type LocalePropsType<TranslationKeys extends string> = {
    stringKey: TranslationKeys;
    valueMap?: Record<string, ReactNode>;
};

export type LocalizationStateType<LocaleName extends string> = {
    isFetchingLocaleData: boolean;
    localeName: LocaleName;
};

export type LocalizationDataType<TranslationKeys extends string> = Record<TranslationKeys, string>;
// eslint-disable-next-line max-len
export type LocalizationDataLoaderType<TranslationKeys extends string> = () => Promise<
    LocalizationDataType<TranslationKeys>
>;

export type RawLocalizationDataType<TranslationKeys extends string> =
    | LocalizationDataLoaderType<TranslationKeys>
    | LocalizationDataType<TranslationKeys>;
// eslint-disable-next-line max-len
export type LocalizationType<LocaleName extends string, TranslationKeys extends string> = Record<
    LocaleName,
    RawLocalizationDataType<TranslationKeys>
>;

export type LocalizationConfigType<TranslationKeys extends string, LocaleName extends string> = {
    defaultLocaleName: LocaleName;
    localization: LocalizationType<LocaleName, TranslationKeys>;
    onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
};

export type LocalizationLibraryType<TranslationKeys extends string, LocaleName extends string> = {
    Locale: (props: LocalePropsType<TranslationKeys>) => JSX.Element;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
};
