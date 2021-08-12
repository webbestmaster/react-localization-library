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
import {createLocalization, LocalizationConfigType, LocalizationStateType} from 'react-localization-library';

const enUs = {
    DIFFERENT_VARIABLES: 'Hello, {one}!' as const, // required to use with value map
    FRIEND: 'friend' as const,
    HELLO: 'Hello' as const,
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
} = createLocalization<LocaleKeysType, LocaleNameType>(localizationConfig);

function ExampleComponent(): JSX.Element {
    const {
        localeName, // LocaleNameType, in this case: 'en-US' | 'ru-RU'
        getLocalizedString, // (stringKey: keyof typeof enUs, valueMap?: Record<string, number | string>) => string;
        setLocaleName, // (localeName: LocaleNameType) => void
    } = useLocale();

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
            {getLocalizedString<typeof enUs.HELLO_SMTH>('HELLO_SMTH', {smth: getLocalizedString('FRIEND')})}

            <p>Example 2</p>
            <Locale stringKey="HELLO" />
            <Locale<typeof enUs.HELLO_SMTH> stringKey="HELLO_SMTH" valueMap={{smth: <Locale stringKey="FRIEND" />}} />

            <p>Example 3</p>
            <Locale<typeof enUs.HELLO_SMTH> stringKey="HELLO_SMTH" valueMap={{smth: '100500'}} />

            <p>Example 4</p>
            <Locale<typeof enUs.DIFFERENT_VARIABLES> stringKey="DIFFERENT_VARIABLES" valueMap={{one: '100500'}} />
            <Locale<typeof ruRu.DIFFERENT_VARIABLES> stringKey="DIFFERENT_VARIABLES" valueMap={{two: '100500'}} />
        </>
    );
}

// eslint-disable-next-line react/no-multi-comp
export function ExampleApp(): JSX.Element {
    return (
        <LocalizationProvider>
            <ExampleComponent />
        </LocalizationProvider>
    );
}
```
