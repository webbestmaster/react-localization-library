import { ReactNode } from 'react';
export declare function getLocalizedString<TranslationKeys extends string, LocaleName extends string>(stringKey: TranslationKeys, localeName: LocaleName, localization: Record<LocaleName, Record<TranslationKeys, string>>, valueMap?: Record<string, string>): string;
export declare function getLocalizedComponentHelper<TranslationKeys extends string, LocaleName extends string>(stringKey: TranslationKeys, localeName: LocaleName, localization: Record<LocaleName, Record<TranslationKeys, string>>, valueMap: Record<string, ReactNode>): Array<JSX.Element | string>;
