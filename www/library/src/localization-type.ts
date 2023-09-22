import type {FC, ReactNode} from "react";

export interface LocaleContextType<TranslationKeys extends string, LocaleName extends string> {
    getLocalizedString: (stringKey: TranslationKeys, valueMap?: Readonly<Record<string, string>>) => string;
    isFetchingLocaleData: boolean;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
}

export interface ProviderPropsType<LocaleName extends string> {
    readonly children: ReactNode;
    readonly forcedLocaleName?: LocaleName;
}

export interface LocalePropsType<TranslationKeys extends string> {
    readonly stringKey: TranslationKeys;
    readonly valueMap?: Record<string, ReactNode>;
}

export interface LocalizationStateType<LocaleName extends string> {
    readonly isFetchingLocaleData: boolean;
    readonly localeName: LocaleName;
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
    readonly defaultLocaleName: LocaleName;
    readonly localization: LocalizationType<LocaleName, TranslationKeys>;
    readonly onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
}

export interface LocalizationLibraryType<TranslationKeys extends string, LocaleName extends string> {
    readonly Locale: (props: LocalePropsType<TranslationKeys>) => JSX.Element;
    readonly LocalizationProvider: FC<ProviderPropsType<LocaleName>>;
    readonly useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
}
