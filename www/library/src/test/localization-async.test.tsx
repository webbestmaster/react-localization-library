/* eslint-disable sonarjs/no-duplicate-string */

/* global describe, test, expect, setTimeout */

import {useEffect} from 'react';

import {render} from '@testing-library/react';

import {createLocalization, LocalizationConfigType, LocalizationStateType} from '../../library';

const enUs = {
    FRIEND: 'friend',
    HARD_STRING: 'the {value1} data {value2} is {value2} here',
    HELLO: 'Hello',
    HELLO_SMTH: 'Hello, {smth}!',
    HELLO_WORLD: 'Hello, World!',
};

const ruRu = {
    FRIEND: 'друг',
    HARD_STRING: 'эти {value1} данные {value2} есть {value2} здесь',
    HELLO: 'Привет',
    HELLO_SMTH: 'Привет, {smth}!',
    HELLO_WORLD: 'Привет, Мир!',
};

type LocaleNameType = 'en-US' | 'ru-RU' | 'sv-SE';
type LocaleKeysType = keyof typeof enUs & keyof typeof ruRu;

const localizationConfig: LocalizationConfigType<LocaleKeysType, LocaleNameType> = {
    defaultLocaleName: 'en-US',
    localization: {
        'en-US': enUs,
        'ru-RU': ruRu,
        'sv-SE': async () => {
            await new Promise((resolve: (value: unknown) => void) => setTimeout(resolve, 100));

            const {svSE} = await import('./sv-se');

            return svSE;
        },
    },
};

describe('Localization Async', () => {
    test('localization provider', () => {
        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {localeName, getLocalizedString} = useLocale();

            return (
                <div>
                    <p className="locale-name">{localeName}</p>
                    <p className="hello">{getLocalizedString('HELLO')}</p>
                    <p className="hello-smth">
                        {getLocalizedString('HELLO_SMTH', {smth: getLocalizedString('FRIEND')})}
                    </p>
                    <p className="hello-world">{getLocalizedString('HELLO_WORLD')}</p>
                </div>
            );
        }

        const {unmount, container} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        const localeNameNode = container.querySelector('.locale-name');
        const helloNode = container.querySelector('.hello');
        const helloSmthNode = container.querySelector('.hello-smth');
        const helloWorldNode = container.querySelector('.hello-world');

        expect(localeNameNode?.innerHTML).toEqual('en-US');
        expect(helloNode?.innerHTML).toEqual('Hello');
        expect(helloSmthNode?.innerHTML).toEqual('Hello, friend!');
        expect(helloWorldNode?.innerHTML).toEqual('Hello, World!');

        unmount();
    });

    test('localization provider - change locale name', () => {
        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {localeName, setLocaleName, getLocalizedString} = useLocale();

            useEffect(() => {
                setLocaleName('ru-RU');
            }, [setLocaleName]);

            return (
                <div>
                    <p className="locale-name">{localeName}</p>
                    <p className="hello">{getLocalizedString('HELLO')}</p>
                    <p className="hello-smth">
                        {getLocalizedString('HELLO_SMTH', {smth: getLocalizedString('FRIEND')})}
                    </p>
                    <p className="hello-world">{getLocalizedString('HELLO_WORLD')}</p>
                </div>
            );
        }

        const {unmount, container} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        const localeNameNode = container.querySelector('.locale-name');
        const helloNode = container.querySelector('.hello');
        const helloSmthNode = container.querySelector('.hello-smth');
        const helloWorldNode = container.querySelector('.hello-world');

        expect(localeNameNode?.innerHTML).toEqual('ru-RU');
        expect(helloNode?.innerHTML).toEqual('Привет');
        expect(helloSmthNode?.innerHTML).toEqual('Привет, друг!');
        expect(helloWorldNode?.innerHTML).toEqual('Привет, Мир!');

        unmount();
    });

    test('localization provider - on useEffect', () => {
        let testingLocaleName: LocaleNameType = 'en-US';

        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>({
            ...localizationConfig,
            defaultLocaleName: testingLocaleName,
            onUseEffect: (data: LocalizationStateType<LocaleNameType>) => {
                const {localeName: newLocaleName} = data;

                testingLocaleName = newLocaleName;
            },
        });

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {setLocaleName} = useLocale();

            useEffect(() => {
                setLocaleName('ru-RU');
            }, [setLocaleName]);

            return <div />;
        }

        const {unmount} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        expect(testingLocaleName).toEqual('ru-RU');

        unmount();
    });

    test('locale', () => {
        const {LocalizationProvider, useLocale, Locale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {setLocaleName} = useLocale();

            useEffect(() => {
                setLocaleName('ru-RU');
            }, [setLocaleName]);

            return (
                <div>
                    <p className="hello">
                        <Locale stringKey="HELLO" />
                    </p>
                    <p className="hello-smth">
                        <Locale
                            stringKey="HELLO_SMTH"
                            valueMap={{
                                smth: (
                                    <span>
                                        <Locale stringKey="FRIEND" />
                                    </span>
                                ),
                            }}
                        />
                    </p>
                    <p className="hello-hard">
                        <Locale stringKey="HARD_STRING" valueMap={{value1: 'value-1', value2: 'value-2'}} />
                    </p>
                </div>
            );
        }

        const {unmount, container} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        const helloNode = container.querySelector('.hello');
        const helloSmthNode = container.querySelector('.hello-smth');
        const helloHardNode = container.querySelector('.hello-hard');

        expect(helloNode?.innerHTML).toEqual('Привет');
        expect(helloSmthNode?.innerHTML).toEqual('Привет, <span>друг</span>!');
        expect(helloHardNode?.innerHTML).toEqual('эти value-1 данные value-2 есть value-2 здесь');

        unmount();
    });
});
