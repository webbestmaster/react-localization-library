import { LocalizationConfigType, LocalizationLibraryType } from './localization-type';
export declare function createLocalization<TranslationKeys extends string, LocaleName extends string>(localizationConfig: LocalizationConfigType<TranslationKeys, LocaleName>): LocalizationLibraryType<TranslationKeys, LocaleName>;
