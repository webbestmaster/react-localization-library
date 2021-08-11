import { FC, ReactNode } from 'react';
export declare type ExtractKeysType<ConstType, ValueType> = ConstType extends `${string}{${infer KeyName}}${infer Rest}` ? ExtractKeysType<Rest, ValueType> & {
    [k in KeyName]: ValueType;
} : {};
export declare type LocaleContextType<TranslationKeys extends string, LocaleName extends string> = {
    getLocalizedString: <TextType = void>(...args: TextType extends void ? [TranslationKeys] : [TranslationKeys, ExtractKeysType<TextType, string>]) => string;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};
export declare type ProviderPropsType = {
    children: ReactNode;
};
export declare type IsStringConstType<MayBeConstStringType> = MayBeConstStringType extends `${string}{${string}}${string}` ? MayBeConstStringType : void;
export declare type LocalePropsType<TranslationKeys extends string, TextType = void> = IsStringConstType<TextType> extends void ? {
    stringKey: TranslationKeys;
    valueMap?: void;
} : {
    stringKey: TranslationKeys;
    valueMap: ExtractKeysType<TextType, ReactNode>;
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
    Locale: <TextType = void>(props: LocalePropsType<TranslationKeys, TextType>) => JSX.Element;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
};
