import {FC, ReactNode} from 'react';

export type ExtractKeysType<ConstType, ValueType> = ConstType extends `${string}{${infer KeyName}}${infer Rest}`
    ? ExtractKeysType<Rest, ValueType> & {[k in KeyName]: ValueType}
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {};

export type LocaleContextType<TranslationKeys extends string, LocaleName extends string> = {
    getLocalizedString: <TextType = void>(
        ...args: TextType extends void ? [TranslationKeys] : [TranslationKeys, ExtractKeysType<TextType, string>]
    ) => string;
    localeName: LocaleName;
    setLocaleName: (localeName: LocaleName) => void;
};

export type ProviderPropsType = {
    children: ReactNode;
};

export type IsStringConstType<MayBeConstStringType> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    MayBeConstStringType extends `${string}{${infer TemplatePartType}}${string}` ? MayBeConstStringType : void;

export type LocalePropsType<TranslationKeys extends string, TextType = void> = IsStringConstType<TextType> extends void
    ? {
          stringKey: TranslationKeys;
          valueMap?: void;
      }
    : {
          stringKey: TranslationKeys;
          valueMap: ExtractKeysType<TextType, ReactNode>;
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
    Locale: <TextType = void>(props: LocalePropsType<TranslationKeys, TextType>) => JSX.Element; // FC<LocalePropsType<TranslationKeys>>;
    LocalizationProvider: FC<ProviderPropsType>;
    useLocale: () => LocaleContextType<TranslationKeys, LocaleName>;
};
