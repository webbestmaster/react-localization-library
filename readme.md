# React Localization Library

[![GitHub license](https://img.shields.io/npm/l/react-localization-library)](https://github.com/webbestmaster/react-localization-library/blob/master/license)
[![npm version](https://img.shields.io/npm/v/react-localization-library.svg?style=flat)](https://www.npmjs.com/package/react-localization-library)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-localization-library)
<!-- [![GitHub stars](https://img.shields.io/github/stars/webbestmaster/react-localization-library?style=social&maxAge=2592000)](https://github.com/webbestmaster/react-localization-library/) -->

Localization hook and component.

## Install

```bash
npm i react-localization-library
```

## Usage
```typescript jsx
import {
    createLocalization,
    LocalizationConfigType,
    LocalizationStateType,
    ExtractKeysType,
} from 'react-localization-library';

const enUs = {
    DIFFERENT_VARIABLES: 'Hello, {one}!' as const, // required to use with value map
    FRIEND: 'friend',
    HELLO: 'Hello',
    HELLO_SMTH: 'Hello, {smth}!' as const, // required to use with value map
    KEY_ONLY_EU_US: 'Hello, en-US!', // TS Error while using
};

const ruRu = {
    DIFFERENT_VARIABLES: 'Hello, {two}!' as const, // required to use with value map
    FRIEND: 'друг',
    HELLO: 'Привет',
    HELLO_SMTH: 'Привет, {smth}!' as const, // required to use with value map
    KEY_ONLY_RU_RU: 'Hello, ru-RU!', // TS Error while using
};

type LocaleNameType = 'en-US' | 'ru-RU';
type LocaleKeysType = keyof typeof enUs & keyof typeof ruRu;

type ValuesMapType = {
    [key in LocaleKeysType]: ExtractKeysType<typeof enUs[key]> & ExtractKeysType<typeof ruRu[key]>;
};

const localizationConfig: LocalizationConfigType<LocaleKeysType, LocaleNameType> = {
    defaultLocaleName: 'en-US',
    localization: {
        'en-US': enUs,
        'ru-RU': ruRu,
    },
    onUseEffect: (data: LocalizationStateType<LocaleNameType>) => {
        const {localeName: newLocaleName} = data;

        console.log('new locale name', newLocaleName);
    },
};

const {
    LocalizationProvider, // provider, required as wrapper
    useLocale, // hook
    Locale, // helpful component
} = createLocalization<LocaleKeysType, LocaleNameType, ValuesMapType>(localizationConfig);

function ExampleComponent(): JSX.Element {
    const {
        localeName, // LocaleNameType, in this case: 'en-US' | 'ru-RU'
        getLocalizedString, // <DICTIONARY_KEY>(stringKey: LocaleKeysType, valueMap?: Record<string, ReactNode>) => string;
        setLocaleName, // (localeName: LocaleNameType) => void
    } = useLocale();

    // usage example
    getLocalizedString<'DIFFERENT_VARIABLES'>('DIFFERENT_VARIABLES', {one: '', two: ''}); //  pass
    getLocalizedString<'FRIEND'>('FRIEND', {anyProperty: ''}); // pass, use 'as const' with parameters to control
    // getLocalizedString<'FRIEND'>('FRIEND'); // throw error
    // getLocalizedString('FRIEND', {}); // throw error
    getLocalizedString('FRIEND'); // pass
    // getLocalizedString('NO_EXISTS_KEY'); // throw error
    getLocalizedString<'HELLO_SMTH'>('HELLO_SMTH', {smth: ''}); // pass
    // getLocalizedString('HELLO_SMTH', {smth: ''}); // throw error

    const someLocaleKey: LocaleKeysType = Math.random() > 0.5 ? 'HELLO' : 'FRIEND';

    return (
        <>
            <h1>Current locale: {localeName}</h1>

            <button onClick={() => setLocaleName('en-US')} type="button">
                use en-US
            </button>
            <button onClick={() => setLocaleName('ru-RU')} type="button">
                use ru-RU
            </button>

            <p>Example 1</p>
            {getLocalizedString('HELLO')}
            <br />
            {getLocalizedString<'HELLO_SMTH'>('HELLO_SMTH', {smth: getLocalizedString('FRIEND')})}

            <p>Example 2</p>
            <Locale stringKey="HELLO" />
            <br />
            <Locale<'HELLO_SMTH'> stringKey="HELLO_SMTH" valueMap={{smth: <Locale stringKey="FRIEND" />}} />

            <p>Example 3</p>
            <Locale<'HELLO_SMTH'> stringKey="HELLO_SMTH" valueMap={{smth: '100500'}} />

            <p>Example 4</p>
            <Locale<'DIFFERENT_VARIABLES'> stringKey="DIFFERENT_VARIABLES" valueMap={{one: '100500', two: '100500'}} />
            <br />
            <Locale<'DIFFERENT_VARIABLES'> stringKey="DIFFERENT_VARIABLES" valueMap={{one: '100500', two: '100500'}} />

            <p>Example 5: troubleshooting, use type void to suit for TypeScript</p>
            <Locale<void> stringKey={someLocaleKey} />
        </>
    );
}

export function ExampleApp(): JSX.Element {
    return (
        <LocalizationProvider>
            <ExampleComponent />
        </LocalizationProvider>
    );
}
```
