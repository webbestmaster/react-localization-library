export type QueryKeyType = number | string | symbol;

export type QuerySimpleValueType = Date | boolean | number | string | null | void;

export type QueryValueType = Array<QuerySimpleValueType> | QuerySimpleValueType;

export type ObjectToUrlParametersType = Readonly<Record<string, QueryValueType>>;

export type QueryMapType<QueryKey extends QueryKeyType = QueryKeyType> = Readonly<Record<QueryKey, string | void>>;

export type UseUrlHookOptionsType = {
    isSaveQueries?: boolean;
};

export type UseUrlHookOptionsDefinedType = {
    isSaveQueries: boolean;
};

export type UseUrlHookType<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType> = Readonly<{
    deleteQuery: (key: keyof QueryMap) => void;
    getQuery: (key: keyof QueryMap) => string | null;
    pathname: Readonly<string>;
    pushState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    pushUrl: (pathname: string, options?: UseUrlHookOptionsType) => void;
    queries: Readonly<QueryMapType<keyof QueryMap>>;
    setQuery: (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
}>;
