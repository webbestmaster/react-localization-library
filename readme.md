# React Localization Library

[![GitHub license](https://img.shields.io/npm/l/react-localization-library)](https://github.com/webbestmaster/react-localization-library/blob/master/license)
[![codecov](https://codecov.io/gh/webbestmaster/react-localization-library/branch/master/graph/badge.svg)](https://codecov.io/gh/webbestmaster/react-localization-library)
[![npm version](https://img.shields.io/npm/v/react-localization-library.svg)](https://www.npmjs.com/package/react-localization-library)
[![Known Vulnerabilities](https://snyk.io/test/github/webbestmaster/react-localization-library/badge.svg)](https://snyk.io/test/github/webbestmaster/react-localization-library)
[![Dependency count](https://badgen.net/bundlephobia/dependency-count/react-localization-library)](https://libraries.io/npm/react-localization-library)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-localization-library)](https://bundlephobia.com/package/react-localization-library)
[![nodejs version](https://img.shields.io/node/v/react-localization-library)](https://nodejs.org/en/docs)
[![Github CI](https://github.com/webbestmaster/react-localization-library/actions/workflows/github-ci.yml/badge.svg)](https://github.com/webbestmaster/react-localization-library/actions/workflows/github-ci.yml)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/webbestmaster/react-localization-library/github-ci.yml)](https://github.com/webbestmaster/react-localization-library/actions/workflows/github-ci.yml)
[![Type definitions](https://img.shields.io/npm/types/react-localization-library)](https://www.typescriptlang.org)
[![Website](https://img.shields.io/website?url=https://github.com/webbestmaster/react-localization-library)](https://github.com/webbestmaster/react-localization-library)
[![CodeFactor](https://www.codefactor.io/repository/github/webbestmaster/react-localization-library/badge)](https://www.codefactor.io/repository/github/webbestmaster/react-localization-library)
[![Package Quality](https://packagequality.com/shield/react-localization-library.svg)](https://packagequality.com/#?package=react-localization-library)
[![GitHub stars](https://img.shields.io/github/stars/webbestmaster/react-localization-library?style=social)](https://github.com/webbestmaster/react-localization-library)

<!--
[![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/webbestmaster/react-localization-library)](https://libraries.io/npm/react-localization-library)
-->

React localization hooks and components.

## Install

```bash
npm i react-localization-library
```

## Usage
```typescript jsx
import {createLocalization, type LocalizationConfigType, type LocalizationStateType} from 'react-localization-library';

const enUs = {
    DIFFERENT_VARIABLES: 'Hello, {one}!',
    FRIEND: 'friend',
    HELLO: 'Hello',
    HELLO_SMTH: 'Hello, {smth}!',
    // KEY_ONLY_EU_US: 'Hello, en-US!', // throw error when using
};

/*
const ruRu = {
    DIFFERENT_VARIABLES: 'Hello, {two}!',
    FRIEND: 'друг',
    HELLO: 'Привет',
    HELLO_SMTH: 'Привет, {smth}!',
    KEY_ONLY_RU_RU: 'Hello, ru-RU!', // throw error when using
};
*/

type LocaleNameType = 'en-US' | 'ru-RU';
type LocaleKeysType = keyof typeof enUs; // & keyof typeof ruRu;

const localizationConfig: LocalizationConfigType<LocaleKeysType, LocaleNameType> = {
    defaultLocaleName: 'en-US',
    localization: {
        'en-US': enUs,
        'ru-RU': async () => {
            const {ruRu} = await import('./ru-ru');

            return ruRu;
        },
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
        isFetchingLocaleData, // boolean
        getLocalizedString, // (stringKey: LocaleKeysType, valueMap?: Record<string, string>) => string;
        setLocaleName, // (localeName: LocaleNameType) => void
    } = useLocale();

    return (
        <>
            <h1>Current locale: {localeName}</h1>
            <h2>Localization data is fetching: {isFetchingLocaleData ? 'Yes' : 'No'}</h2>

            <button onClick={() => setLocaleName('en-US')} type="button">
                use en-US
            </button>
            <button onClick={() => setLocaleName('ru-RU')} type="button">
                use ru-RU
            </button>

            <p>Example 1</p>

            {getLocalizedString('FRIEND')}
            <br />
            {getLocalizedString('HELLO_SMTH', {smth: 'type string'})}
            <br />
            {getLocalizedString('DIFFERENT_VARIABLES', {one: 'word 1', two: 'word 2'})}

            <p>Example 2</p>

            <Locale stringKey="FRIEND" />
            <br />
            <Locale stringKey="HELLO_SMTH" valueMap={{smth: <Locale stringKey="FRIEND" />}} />
            <br />
            <Locale stringKey="DIFFERENT_VARIABLES" valueMap={{one: 'word 1', two: 'word 2'}} />
        </>
    );
}

export function ExampleApp(): JSX.Element {
    return (
        <LocalizationProvider
            forcedLocaleName="ru-RU" // forcedLocaleName optional and will rewrite a defaultLocaleName from config
        >
            <ExampleComponent />
        </LocalizationProvider>
    );
}
```

## License

See [license](license).
