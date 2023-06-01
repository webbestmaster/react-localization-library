/* eslint-disable sort-keys, react/no-multi-comp */

import {StrictMode} from 'react';

import {createLocalization, LocalizationConfigType, LocalizationStateType} from '../library/library';

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
        <StrictMode>
            <LocalizationProvider
                forcedLocaleName="ru-RU" // forcedLocaleName optional and will rewrite a defaultLocaleName from config
            >
                <ExampleComponent />
            </LocalizationProvider>
        </StrictMode>
    );
}
