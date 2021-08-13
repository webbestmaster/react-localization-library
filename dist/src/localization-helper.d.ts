import { DefaultValuesMapType } from './localization-type';
export declare function getLocalizedString<TranslationKeys extends string, LocaleName extends string, ValuesMapType extends DefaultValuesMapType<TranslationKeys>>(stringKey: TranslationKeys, localeName: LocaleName, localization: Record<LocaleName, Record<TranslationKeys, string>>, valueMap?: ValuesMapType): string;
