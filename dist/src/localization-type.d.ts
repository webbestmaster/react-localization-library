import { FC, ReactNode } from 'react';
declare type ExtractKeysValueType<ConstType, ValueType> = ConstType extends `${string}{${infer KeyNames}}${infer Rest}` ? ExtractKeysValueType<Rest, ValueType> & {
    [key in KeyNames]: ValueType;
} : {};
export declare type ExtractKeysType<ConstType> = ExtractKeysValueType<ConstType, ReactNode>;
export declare type DefaultValuesMapType<TranslationKeys extends string> = {
    [key in TranslationKeys]: Record<string, ReactNode>;
};
export declare type LocaleContextType<TranslationKeys extends string, LocaleName extends string, ValuesMapType extends DefaultValuesMapType<TranslationKeys>> = {
    getLocalizedString: <TextType extends TranslationKeys | void = void>(...args: TextType extends TranslationKeys ? [TranslationKeys, ValuesMapType[TextType]] : [TranslationKeys]) => string;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};
export declare type ProviderPropsType = {
    children: ReactNode;
};
export declare type IsStringConstType<MayBeConstStringType> = MayBeConstStringType extends `${string}{${string}}${string}` ? MayBeConstStringType : void;
export declare type LocalePropsType<TranslationKeys extends string, ValuesMapType extends DefaultValuesMapType<TranslationKeys>, TextType extends TranslationKeys | void = void> = TextType extends TranslationKeys ? {
    stringKey: TextType;
    valueMap?: ValuesMapType[TextType];
} : {
    stringKey: TranslationKeys;
    valueMap?: void;
};
export declare type LocalizationStateType<LocaleName extends string> = {
    localeName: LocaleName;
};
export declare type LocalizationConfigType<TranslationKeys extends string, LocaleName extends string> = {
    defaultLocaleName: LocaleName;
    localization: Record<LocaleName, Record<TranslationKeys, string>>;
    onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
};
export declare type LocalizationLibraryType<TranslationKeys extends string, LocaleName extends string, ValuesMapType extends DefaultValuesMapType<TranslationKeys>> = {
    Locale: <TextType extends TranslationKeys | void = void>(props: LocalePropsType<TranslationKeys, ValuesMapType, TextType>) => JSX.Element;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName, ValuesMapType>;
};
export {};
