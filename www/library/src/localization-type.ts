import type {FC, ReactNode} from "react";

export interface LocaleContextType<TranslationKeys extends string, LocaleName extends string> {
    getLocalizedString: (stringKey: TranslationKeys, valueMap?: Record<string, string>) => string;
    isFetchingLocaleData: boolean;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
}

export interface ProviderPropsType<LocaleName extends string> {
    children: ReactNode;
    forcedLocaleName?: LocaleName;
}

export interface LocalePropsType<TranslationKeys extends string> {
    stringKey: TranslationKeys;
    valueMap?: Record<string, ReactNode>;
}

export interface LocalizationStateType<LocaleName extends string> {
    isFetchingLocaleData: boolean;
    localeName: LocaleName;
}

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

export interface LocalizationConfigType<TranslationKeys extends string, LocaleName extends string> {
    defaultLocaleName: LocaleName;
    localization: LocalizationType<LocaleName, TranslationKeys>;
    onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
}

export interface LocalizationLibraryType<TranslationKeys extends string, LocaleName extends string> {
    Locale: (props: LocalePropsType<TranslationKeys>) => JSX.Element;
    LocalizationProvider: FC<ProviderPropsType<LocaleName>>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
}
