import { LocalizationConfigType, LocalizationLibraryType } from '../library';
import { DefaultValuesMapType } from './localization-type';
export declare function createLocalization<TranslationKeys extends string, LocaleName extends string, ValuesMapType extends DefaultValuesMapType<TranslationKeys>>(localizationConfig: LocalizationConfigType<TranslationKeys, LocaleName>): LocalizationLibraryType<TranslationKeys, LocaleName, ValuesMapType>;
