/* global Intl */

import {LocaleNameEnum} from '../provider/locale/locale-context-type';

export enum TimeSizeEnum {
    day = 'day',
    hour = 'hour',
    minute = 'minute',
    month = 'month',
    second = 'second',
    year = 'year',
}

export type NumberFormatOptionsType = Intl.NumberFormatOptions & {
    notation?: 'compact' | 'engineering' | 'scientific';
    signDisplay?: 'always' | 'auto' | 'exceptZero' | 'never';
    style?: 'currency' | 'decimal' | 'percent' | 'unit';
    unit?: TimeSizeEnum | 'liter' | 'percent';
    unitDisplay?: 'long' | 'narrow' | 'short';
};

export function getFormattedNumber(
    localeName: LocaleNameEnum,
    value: number,
    options?: NumberFormatOptionsType
): string {
    const formatter = new Intl.NumberFormat(localeName, options);

    return formatter.format(value);
}

type FormatMainType = '2-digit' | 'numeric';

export type DateTimeFormatOptionsType = {
    [TimeSizeEnum.year]?: FormatMainType;
    [TimeSizeEnum.month]?: FormatMainType | 'long' | 'narrow' | 'short';
    [TimeSizeEnum.day]?: FormatMainType;
    [TimeSizeEnum.hour]?: FormatMainType;
    [TimeSizeEnum.minute]?: FormatMainType;
    [TimeSizeEnum.second]?: FormatMainType;
    timeZone?: string;
};

export function getFormattedDateTime(
    localeName: LocaleNameEnum,
    date: Date | number,
    options?: DateTimeFormatOptionsType
): string {
    const formatter = new Intl.DateTimeFormat(localeName, options);

    return formatter.format(date);
}
