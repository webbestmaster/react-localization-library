/* global NodeJS, setTimeout, clearTimeout */

export function noop(): unknown {
    return;
}

export function debounce<ArgsType extends Array<unknown>>(
    wrappedFunction: (...args: ArgsType) => unknown,
    waitInMs: number
): (...args: ArgsType) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function debouncedFunction(...args: ArgsType): void {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            wrappedFunction(...args);
        }, waitInMs);
    };
}
