import {DateTimeFormatOptionsType, NumberFormatOptionsType} from '../../util/format';

export type UseFormatHookType = {
    getFormattedDateTime: (date: Date | number, options?: DateTimeFormatOptionsType) => string;
    getFormattedNumber: (value: number, options?: NumberFormatOptionsType) => string;
};
