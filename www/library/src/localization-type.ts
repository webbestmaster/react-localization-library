import {FC, ReactNode} from 'react';
// import {ruRu, enUs, LocaleKeysType} from "../../page/home/home";

export type ExtractKeysType<ConstType, ValueType> = ConstType extends `${string}{${infer KeyName}}${infer Rest}`
    ? ExtractKeysType<Rest, ValueType> & {[k in KeyName]: ValueType}
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {};

export type DefaultValuesMapType<TranslationKeys extends string> = {[key in TranslationKeys]: Record<string, unknown>};

export type LocaleContextType<
    TranslationKeys extends string,
    LocaleName extends string,
    ValuesMapType extends DefaultValuesMapType<TranslationKeys>
> = {
    // getLocalizedString: <TextType extends TranslationKeys>(
    //     ...args: TextType extends void ? [TranslationKeys] : [TranslationKeys, ValuesMapType[TextType]]
    // ) => string;
    getLocalizedString: <TextType extends TranslationKeys>(
        stringKey: TextType,
        valueMap?: ValuesMapType[TextType]
    ) => string;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};

export type ProviderPropsType = {
    children: ReactNode;
};

export type IsStringConstType<MayBeConstStringType> = MayBeConstStringType extends `${string}{${string}}${string}`
    ? MayBeConstStringType
    : void;

export type LocalePropsType<
    TranslationKeys extends string,
    TextType extends TranslationKeys,
    ValuesMapType extends DefaultValuesMapType<TranslationKeys>
> = {
    stringKey: TextType;
    valueMap?: ValuesMapType[TextType];
};

export type LocalizationStateType<LocaleName extends string> = {
    localeName: LocaleName;
};

export type LocalizationConfigType<TranslationKeys extends string, LocaleName extends string> = {
    defaultLocaleName: LocaleName;
    localization: Record<LocaleName, Record<TranslationKeys, string>>;
    onUseEffect?: (localizationProviderState: LocalizationStateType<LocaleName>) => void;
};

export type LocalizationLibraryType<
    TranslationKeys extends string,
    LocaleName extends string,
    ValuesMapType extends DefaultValuesMapType<TranslationKeys>
> = {
    Locale: <TextType extends TranslationKeys>(
        props: LocalePropsType<TranslationKeys, TextType, ValuesMapType>
    ) => JSX.Element; // FC<LocalePropsType<TranslationKeys>>;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName, ValuesMapType>;
};
