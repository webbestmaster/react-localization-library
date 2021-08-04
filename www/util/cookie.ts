/* global document */

type SetCookieOptionsType = {
    [key: string]: Date | boolean | number | string | null;
};

export function getCookie(name: string): string | null {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([$()*+./?[\\\]^{|}])/g, '\\$1') + '=([^;]*)')
    );

    return matches ? decodeURIComponent(matches[1]) : null;
}

export function setCookie(name: string, value: string, rawOptions: SetCookieOptionsType = {}): void {
    const options = {
        // path: '/',
        ...rawOptions,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    Object.keys(options).forEach((optionKey: string) => {
        updatedCookie += '; ' + optionKey;
        const optionValue = options[optionKey];

        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    });

    // eslint-disable-next-line unicorn/no-document-cookie
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
    setCookie(name, '', {'max-age': -1});
}
