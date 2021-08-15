import {FC, ReactNode} from 'react';

type ExtractKeysValueType<ConstType, ValueType> = ConstType extends `${string}{${infer KeyNames}}${infer Rest}`
    ? ExtractKeysValueType<Rest, ValueType> & {[key in KeyNames]: ValueType}
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {};

export type ExtractKeysType<ConstType> = ExtractKeysValueType<ConstType, ReactNode>;

export type DefaultValuesMapType<TranslationKeys extends string> = {
    [key in TranslationKeys]: Record<string, ReactNode>;
};

export type LocaleContextType<
    TranslationKeys extends string,
    LocaleName extends string,
    ValuesMapType extends DefaultValuesMapType<TranslationKeys>
> = {
    getLocalizedString: <TextType extends TranslationKeys | void = void>(
        ...args: TextType extends TranslationKeys ? [TranslationKeys, ValuesMapType[TextType]] : [TranslationKeys]
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
    ValuesMapType extends DefaultValuesMapType<TranslationKeys>,
    TextType extends TranslationKeys | void = void
> = TextType extends TranslationKeys
    ? {
          stringKey: TextType;
          valueMap?: ValuesMapType[TextType];
      }
    : {
          stringKey: TranslationKeys;
          valueMap?: void;
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
    Locale: <TextType extends TranslationKeys | void = void>(
        props: LocalePropsType<TranslationKeys, ValuesMapType, TextType>
    ) => JSX.Element; // FC<LocalePropsType<TranslationKeys>>;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName, ValuesMapType>;
};
