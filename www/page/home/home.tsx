/* eslint-disable sort-keys, react/no-multi-comp */

import {
    createLocalization,
    LocalizationConfigType,
    LocalizationStateType,
    ExtractKeysType,
} from '../../library/library';

const enUs = {
    DIFFERENT_VARIABLES: 'Hello, {one}!' as const, // required to use with value map
    FRIEND: 'friend',
    HELLO: 'Hello',
    HELLO_SMTH: 'Hello, {smth}!' as const, // required to use with value map
    KEY_ONLY_EU_US: 'Hello, en-US!', // TS Error while using

    BUTTON__YES: 'Yes',
    BUTTON__NO: 'No',
    BUTTON__CANCEL: 'Cancel',
    BUTTON__CLOSE: 'Close',
    BUTTON__SEND: 'Send',
    BUTTON__OK: 'OK',
    BUTTON__APPLY: 'Apply',
    BUTTON__CONFIRM: 'Confirm',
    BUTTON__DECLINE: 'Decline',
    BUTTON__UPLOAD: 'Upload',
    BUTTON__DOWNLOAD: 'Download',
    BUTTON__SELECT: 'Select',
    BUTTON__SELECT_A_FILE: 'Select a file',
    BUTTON__PREVIOUS_STEP: 'Previous step',
    BUTTON__NEXT_STEP: 'Next step',
    BUTTON__ADD: 'Add',
    BUTTON__CREATE: 'Create',
    BUTTON__UPLOAD_IMAGE: 'Upload image',
    BUTTON__UPDATE: 'Update',
    BUTTON__UPDATE_INFO: 'Update info',
    BUTTON__SAVE_INFORMATION: 'Save information',
    BUTTON__COMPLETE_CREATION: 'Complete creation',
};

const ruRu = {
    DIFFERENT_VARIABLES: 'Hello, {two}!' as const, // required to use with value map
    FRIEND: 'друг',
    HELLO: 'Привет',
    HELLO_SMTH: 'Привет, {smth}!' as const, // required to use with value map
    KEY_ONLY_RU_RU: 'Hello, ru-RU!', // TS Error while using

    BUTTON__YES: 'Yes',
    BUTTON__NO: 'No',
    BUTTON__CANCEL: 'Cancel',
    BUTTON__CLOSE: 'Close',
    BUTTON__SEND: 'Send',
    BUTTON__OK: 'OK',
    BUTTON__APPLY: 'Apply',
    BUTTON__CONFIRM: 'Confirm',
    BUTTON__DECLINE: 'Decline',
    BUTTON__UPLOAD: 'Upload',
    BUTTON__DOWNLOAD: 'Download',
    BUTTON__SELECT: 'Select',
    BUTTON__SELECT_A_FILE: 'Select a file',
    BUTTON__PREVIOUS_STEP: 'Previous step',
    BUTTON__NEXT_STEP: 'Next step',
    BUTTON__ADD: 'Add',
    BUTTON__CREATE: 'Create',
    BUTTON__UPLOAD_IMAGE: 'Upload image',
    BUTTON__UPDATE: 'Update',
    BUTTON__UPDATE_INFO: 'Update info',
    BUTTON__SAVE_INFORMATION: 'Save information',
    BUTTON__COMPLETE_CREATION: 'Complete creation',
};

type LocaleNameType = 'en-US' | 'ru-RU';
export type LocaleKeysType = keyof typeof enUs & keyof typeof ruRu;

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

export const {
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
            {getLocalizedString<'HELLO_SMTH'>('HELLO_SMTH', {smth: getLocalizedString('FRIEND')})}

            <p>Example 2</p>
            <Locale stringKey="HELLO" />
            <Locale<'HELLO_SMTH'> stringKey="HELLO_SMTH" valueMap={{smth: <Locale stringKey="FRIEND" />}} />

            <p>Example 3</p>
            <Locale<'HELLO_SMTH'> stringKey="HELLO_SMTH" valueMap={{smth: '100500'}} />

            <p>Example 4</p>
            <Locale<'DIFFERENT_VARIABLES'> stringKey="DIFFERENT_VARIABLES" valueMap={{one: '100500', two: '100500'}} />
            <Locale<'DIFFERENT_VARIABLES'> stringKey="DIFFERENT_VARIABLES" valueMap={{one: '100500', two: '100500'}} />

            <p>Example 5: troubleshooting, use type &apos;void&apos; to suit for TypeScript</p>
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
