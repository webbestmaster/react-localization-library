/* global Location */

import {useCallback, useMemo} from 'react';
import {useHistory} from 'react-router-dom';

import {getParametersFromUrl, objectToUrlParameters} from './url-hook-helper';
import {ObjectToUrlParametersType, QueryMapType, UseUrlHookOptionsType, UseUrlHookType} from './url-hook-type';
import {urlHookDefaultOptions} from './url-hook-const';

export function useUrl<
    QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType
>(): UseUrlHookType<QueryMap> {
    const routerHistory = useHistory<Location>();
    const {location: routerLocation} = routerHistory;
    const {search, pathname} = routerLocation;

    const queries: QueryMapType<keyof QueryMap> = useMemo(() => {
        return getParametersFromUrl('http://localhost/' + search);
    }, [search]);

    const persistRoute = useCallback(
        (newPathname: string, queriesInner: ObjectToUrlParametersType, options?: UseUrlHookOptionsType): void => {
            const definedOptions = {...urlHookDefaultOptions, ...(options || {})};

            const resultQueryMap = definedOptions.isSaveQueries ? {...queries, ...queriesInner} : queriesInner;

            routerHistory.push({pathname: newPathname, search: objectToUrlParameters(resultQueryMap)});
        },
        [queries, routerHistory]
    );

    const setQuery = useCallback(
        (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            persistRoute(pathname, queryMap, options);
        },
        [persistRoute, pathname]
    );

    const getQuery = useCallback(
        (key: keyof QueryMap): string | null => {
            const queryValue: string | void = queries[key];

            return queryValue || null;
        },
        [queries]
    );

    const deleteQuery = useCallback(
        (key: keyof QueryMap): void => {
            const queriesInner = {...queries};

            Reflect.deleteProperty(queriesInner, key);

            persistRoute(pathname, queriesInner, {isSaveQueries: false});
        },
        [pathname, queries, persistRoute]
    );

    const pushUrl = useCallback(
        (newPathname: string, options?: UseUrlHookOptionsType): void => {
            persistRoute(newPathname, {}, options);
        },
        [persistRoute]
    );

    const pushState = useCallback(
        (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            persistRoute(newPathname, queryMap, options);
        },
        [persistRoute]
    );

    return useMemo((): UseUrlHookType<QueryMap> => {
        return {
            deleteQuery,
            getQuery,
            pathname,
            pushState,
            pushUrl,
            queries,
            setQuery,
        };
    }, [setQuery, getQuery, deleteQuery, pushUrl, pushState, queries, pathname]);
}
