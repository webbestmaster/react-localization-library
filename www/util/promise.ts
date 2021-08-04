export function throwError(error: Error): void {
    console.warn('Throw a error!');
    console.error(error);
    throw error;
}

export type PromiseResolveType<Result> = (result: Result) => unknown;
