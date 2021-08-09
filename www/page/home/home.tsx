import {createLocalization, LocalizationConfigType, LocalizationStateType} from '../../library/library';

const enUS = {
    FRIEND: 'friend',
    HELLO: 'Hello',
    HELLO_SMTH: 'Hello, {smth}!',
};

const ruRu: typeof enUS = {
    FRIEND: 'друг',
    HELLO: 'Привет',
    HELLO_SMTH: 'Привет, {smth}!',
};

type LocaleNameType = 'en-US' | 'ru-RU';

const localizationConfig: LocalizationConfigType<keyof typeof enUS, LocaleNameType> = {
    defaultLocaleName: 'en-US',
    localization: {
        'en-US': enUS,
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
} = createLocalization<keyof typeof enUS, LocaleNameType>(localizationConfig);

function ExampleComponent(): JSX.Element {
    const {
        localeName, // LocaleNameType, in this case: 'en-US' | 'ru-RU'
        getLocalizedString, // (stringKey: keyof typeof enUS, valueMap?: Record<string, number | string>) => string;
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
            {getLocalizedString('HELLO_SMTH', {smth: getLocalizedString('FRIEND')})}

            <p>Example 2</p>
            <Locale stringKey="HELLO" />
            <Locale stringKey="HELLO_SMTH" valueMap={{smth: <Locale stringKey="FRIEND" />}} />

            <p>Example 3</p>
            <Locale stringKey="HELLO_SMTH" valueMap={{smth: '100500'}} />
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
