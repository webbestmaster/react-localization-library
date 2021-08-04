/* global URL */

import {ObjectToUrlParametersType, QueryMapType, QuerySimpleValueType, QueryValueType} from './url-hook-type';

// eslint-disable-next-line complexity
function stringifyUrlParameterSimpleValue(value: QuerySimpleValueType): string | null {
    // QuerySimpleValueType

    // void | null
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    // empty string
    if (typeof value === 'string') {
        return value.trim() || null;
    }

    // Date, `Number.isNaN(value.getTime())` - check for valid Date
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value.toISOString();
    }

    if (typeof value === 'number') {
        // check for Infinity and NaN
        return JSON.parse(JSON.stringify(value));
    }

    // if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
    // }

    // return null;
}

export function objectToUrlParameters(options: ObjectToUrlParametersType): string {
    const parameterList: Array<string> = [];

    // eslint-disable-next-line complexity
    Object.keys(options).forEach((key: string) => {
        const value: QueryValueType = options[key];

        if (Array.isArray(value) && value.length === 0) {
            return;
        }

        if (Array.isArray(value)) {
            const stringList: Array<string> = value
                .map<string | null>((simpleValue: QuerySimpleValueType): string | null =>
                    stringifyUrlParameterSimpleValue(simpleValue)
                )
                .filter<string>((stringValueInner: string | null): stringValueInner is string =>
                    Boolean(stringValueInner)
                );

            if (stringList.length > 0) {
                parameterList.push(encodeURIComponent(key) + '=' + encodeURIComponent(stringList.join(',')));
            }

            return;
        }

        const stringValue: string | null = stringifyUrlParameterSimpleValue(value);

        if (stringValue) {
            parameterList.push(encodeURIComponent(key) + '=' + encodeURIComponent(stringValue));
        }
    });

    return parameterList.join('&');
}

export function getParametersFromUrl(fullUrlString: string): QueryMapType {
    const url: URL = new URL(fullUrlString);

    return Object.fromEntries(url.searchParams.entries());
}
