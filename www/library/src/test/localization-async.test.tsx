/* eslint-disable sonarjs/no-duplicate-string */

/* global describe, test, expect */

import {useEffect} from 'react';

import {render, waitFor} from '@testing-library/react';

import {waitForTime} from '../../../../test-unit/util';
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

type LocaleNameType = 'en-US' | 'ru-RU';
type LocaleKeysType = keyof typeof enUs & keyof typeof ruRu;

const localizationConfig: LocalizationConfigType<LocaleKeysType, LocaleNameType> = {
    defaultLocaleName: 'en-US',
    localization: {
        'en-US': async () => {
            await waitForTime(100);

            return enUs;
        },
        'ru-RU': async () => {
            await waitForTime(100);

            return ruRu;
        },
        // 'sv-SE': async () => {
        //     await waitForTime(100);
        //
        //     const {svSE} = await import('./sv-se');
        //
        //     return svSE;
        // },
    },
};

describe('Localization async', () => {
    test('localization provider async', async () => {
        let isFetchingLocaleDataExternal = false;

        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {localeName, getLocalizedString, isFetchingLocaleData} = useLocale();

            useEffect(() => {
                isFetchingLocaleDataExternal = isFetchingLocaleData;
            }, [isFetchingLocaleData]);

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

        expect(isFetchingLocaleDataExternal).toEqual(true);
        await waitFor(() => expect(isFetchingLocaleDataExternal).toEqual(false), {interval: 50, timeout: 150});

        expect(localeNameNode?.innerHTML).toEqual('en-US');
        expect(helloNode?.innerHTML).toEqual('Hello');
        expect(helloSmthNode?.innerHTML).toEqual('Hello, friend!');
        expect(helloWorldNode?.innerHTML).toEqual('Hello, World!');

        unmount();
    });

    test('localization provider - change locale name async', async () => {
        let localeNameExternal: LocaleNameType = localizationConfig.defaultLocaleName;
        let isFetchingLocaleDataExternal = false;

        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {localeName, setLocaleName, getLocalizedString, isFetchingLocaleData} = useLocale();

            useEffect(() => {
                isFetchingLocaleDataExternal = isFetchingLocaleData;
            }, [isFetchingLocaleData]);

            useEffect(() => {
                if (!isFetchingLocaleData && localeName !== 'ru-RU') {
                    setLocaleName('ru-RU');
                    localeNameExternal = 'ru-RU';
                }
            }, [setLocaleName, isFetchingLocaleData, localeName]);

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

        await waitFor(
            () => {
                expect(localeNameExternal).toEqual('ru-RU');
                expect(isFetchingLocaleDataExternal).toEqual(false);
            },
            {
                interval: 50,
                timeout: 500,
            }
        );

        const localeNameNode = container.querySelector('.locale-name');
        const helloNode = container.querySelector('.hello');
        const helloSmthNode = container.querySelector('.hello-smth');
        const helloWorldNode = container.querySelector('.hello-world');

        await waitFor(() => expect(localeNameExternal).toEqual('ru-RU'), {interval: 50, timeout: 150});
        await waitFor(() => expect(isFetchingLocaleDataExternal).toEqual(false), {interval: 50, timeout: 150});

        expect(localeNameNode?.innerHTML).toEqual('ru-RU');
        expect(helloNode?.innerHTML).toEqual('Привет');
        expect(helloSmthNode?.innerHTML).toEqual('Привет, друг!');
        expect(helloWorldNode?.innerHTML).toEqual('Привет, Мир!');

        unmount();
    });

    test('localization provider - on useEffect async', async () => {
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
            const {setLocaleName, isFetchingLocaleData, localeName} = useLocale();

            useEffect(() => {
                if (!isFetchingLocaleData && localeName !== 'ru-RU') {
                    setLocaleName('ru-RU');
                }
            }, [setLocaleName, isFetchingLocaleData, localeName]);

            return <div />;
        }

        const {unmount} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        await waitFor(() => expect(testingLocaleName).toEqual('ru-RU'), {interval: 50, timeout: 250});

        unmount();
    });

    test.skip('locale async', () => {
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