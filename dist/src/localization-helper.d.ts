import { type ReactNode } from "react";
import type { LocalizationDataType, LocalizationType } from "./localization-type";
export declare function getLocalizedString<TranslationKeys extends string, LocaleName extends string>(stringKey: TranslationKeys, localeName: LocaleName, localization: LocalizationDataType<TranslationKeys>, valueMap?: Readonly<Record<string, string>>): string;
export declare function getLocalizedComponentHelper<TranslationKeys extends string, LocaleName extends string>(stringKey: TranslationKeys, localeName: LocaleName, localization: LocalizationDataType<TranslationKeys>, valueMap: Record<string, ReactNode>): Array<JSX.Element | string>;
export declare function fetchLocalizationData<LocaleName extends string, TranslationKeys extends string>(localeName: LocaleName, localization: LocalizationType<LocaleName, TranslationKeys>): Promise<LocalizationDataType<TranslationKeys>>;
