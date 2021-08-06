import { LocaleContextValueMapType } from './localization-type';
export declare function getLocalizedString<TranslationKeys extends string, LocaleName extends string>(stringKey: TranslationKeys, localeName: LocaleName, localization: Record<LocaleName, Record<TranslationKeys, string>>, valueMap?: LocaleContextValueMapType): string;
