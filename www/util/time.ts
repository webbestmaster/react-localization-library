/* global setTimeout */

import {LocaleNameEnum} from '../provider/locale/locale-context-type';

import {getFormattedNumber, NumberFormatOptionsType, TimeSizeEnum} from './format';

export type TimeItemType = {count: number; unitType: TimeSizeEnum};

export type GetDateTimeDifferenceOptionType = {
    formatOption?: NumberFormatOptionsType;
    localeName: LocaleNameEnum;
    milliseconds: number;
    sliceSize: number;
};

export function waitForTime(timeInMs: number): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
        setTimeout(() => {
            resolve();
        }, timeInMs);
    });
}

export function getDateTimeHumanSize(option: GetDateTimeDifferenceOptionType): string {
    const {milliseconds, sliceSize, localeName, formatOption} = option;

    const minuteSize = 60; // 60 seconds
    const hourSize = 60; // 60 minutes
    const daySize = 24; // 24 hours
    const monthSize = 30; // 30 days
    const yearSize = 12; // 12 months

    const seconds = milliseconds / 1e3;
    const minutes = seconds / minuteSize;
    const hours = minutes / hourSize;
    const days = hours / daySize;
    // const weeks = days / 7;
    const months = days / monthSize;
    const years = months / yearSize;

    const yearPart = Math.floor(years);
    const monthPart = Math.floor(months) % yearSize;
    // const weekPart = Math.floor(weeks);
    const dayPart = Math.floor(days) % monthSize;
    const hourPart = Math.floor(hours) % daySize;
    const minutePart = (Math.floor(minutes) % 24) % hourSize;
    const secondPart = ((Math.floor(seconds) % 24) % 60) % minuteSize;

    return [
        {count: yearPart, unitType: TimeSizeEnum.year},
        {count: monthPart, unitType: TimeSizeEnum.month},
        {count: dayPart, unitType: TimeSizeEnum.day},
        {count: hourPart, unitType: TimeSizeEnum.hour},
        {count: minutePart, unitType: TimeSizeEnum.minute},
        {count: secondPart, unitType: TimeSizeEnum.second},
    ]
        .filter((timeItem: TimeItemType): boolean => timeItem.count >= 1)
        .slice(0, sliceSize)
        .filter((timeItem: TimeItemType): boolean => timeItem.count >= 1)
        .map((timeItem: TimeItemType): string => {
            const {count, unitType} = timeItem;

            return getFormattedNumber(localeName, count, {
                style: 'unit',
                unit: unitType,
                unitDisplay: 'long',
                ...formatOption,
            });
        })
        .join(' ');
}
