import { LocalizationConfigType, LocalizationLibraryType } from '../library';
export declare function createLocalization<TranslationKeys extends string, LocaleName extends string>(localizationConfig: LocalizationConfigType<TranslationKeys, LocaleName>): LocalizationLibraryType<TranslationKeys, LocaleName>;
