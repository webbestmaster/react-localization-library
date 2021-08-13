/*
import {useCallback} from 'react';

import {useLocale} from '../../provider/locale/locale-context';
import {
    DateTimeFormatOptionsType,
    getFormattedDateTime,
    getFormattedNumber,
    NumberFormatOptionsType,
} from '../../util/format';

import {UseFormatHookType} from './format-hook-type';

export function useFormat(): UseFormatHookType {
    // const {localeName} = useLocale();

/!*
    const getFormattedNumberWrapper = useCallback(
        (value: number, options?: NumberFormatOptionsType): string => {
            return getFormattedNumber(localeName, value, options);
        },
        [localeName]
    );

    const getFormattedDateTimeWrapper = useCallback(
        (date: Date | number, options?: DateTimeFormatOptionsType): string => {
            return getFormattedDateTime(localeName, date, options);
        },
        [localeName]
    );
*!/

    return {
        getFormattedDateTime: getFormattedDateTimeWrapper,
        getFormattedNumber: getFormattedNumberWrapper,
    };
}
*/
