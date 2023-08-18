/* eslint-disable sonarjs/no-duplicate-string */

import assert from "node:assert/strict";

import {useEffect} from "react";

import {render, waitFor} from "@testing-library/react";
import {describe, it, expect} from "@jest/globals";

import {waitForTime} from "../../../../test-unit/util";
import {createLocalization, LocalizationConfigType, LocalizationStateType} from "../../library";
import {fetchLocalizationData} from "../localization-helper";

const enUs = {
    FRIEND: "friend",
    HARD_STRING: "the {value1} data {value2} is {value2} here",
    HELLO: "Hello",
    HELLO_SMTH: "Hello, {smth}!",
    HELLO_WORLD: "Hello, World!",
};

const ruRu = {
    FRIEND: "друг",
    HARD_STRING: "эти {value1} данные {value2} есть {value2} здесь",
    HELLO: "Привет",
    HELLO_SMTH: "Привет, {smth}!",
    HELLO_WORLD: "Привет, Мир!",
};

type LocaleNameType = "en-US" | "ru-RU";
// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
type LocaleKeysType = keyof typeof enUs & keyof typeof ruRu;

const localizationConfig: LocalizationConfigType<LocaleKeysType, LocaleNameType> = {
    defaultLocaleName: "en-US",
    localization: {
        "en-US": async () => {
            await waitForTime(100);

            return enUs;
        },
        "ru-RU": async () => {
            await waitForTime(100);

            return ruRu;
        },
    },
};

describe("localization async", () => {
    it("localization provider async", async () => {
        expect.assertions(5);
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
                    <p className="hello">{getLocalizedString("HELLO")}</p>
                    <p className="hello-smth">
                        {getLocalizedString("HELLO_SMTH", {smth: getLocalizedString("FRIEND")})}
                    </p>
                    <p className="hello-world">{getLocalizedString("HELLO_WORLD")}</p>
                </div>
            );
        }

        const {unmount, container} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        expect(isFetchingLocaleDataExternal).toBe(true);
        await waitFor(
            () => {
                assert.equal(isFetchingLocaleDataExternal, false);
            },
            {interval: 50, timeout: 250}
        );

        const localeNameNode = container.querySelector(".locale-name");
        const helloNode = container.querySelector(".hello");
        const helloSmthNode = container.querySelector(".hello-smth");
        const helloWorldNode = container.querySelector(".hello-world");

        expect(localeNameNode?.innerHTML).toBe("en-US");
        expect(helloNode?.innerHTML).toBe("Hello");
        expect(helloSmthNode?.innerHTML).toBe("Hello, friend!");
        expect(helloWorldNode?.innerHTML).toBe("Hello, World!");

        unmount();
    });

    it("localization provider - change locale name async", async () => {
        expect.assertions(4);
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
                // eslint-disable-next-line jest/no-conditional-in-test
                if (!isFetchingLocaleData && localeName !== "ru-RU") {
                    setLocaleName("ru-RU");
                    localeNameExternal = "ru-RU";
                }
            }, [setLocaleName, isFetchingLocaleData, localeName]);

            return (
                <div>
                    <p className="locale-name">{localeName}</p>
                    <p className="hello">{getLocalizedString("HELLO")}</p>
                    <p className="hello-smth">
                        {getLocalizedString("HELLO_SMTH", {smth: getLocalizedString("FRIEND")})}
                    </p>
                    <p className="hello-world">{getLocalizedString("HELLO_WORLD")}</p>
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
                assert.equal(localeNameExternal, "ru-RU");
                assert.equal(isFetchingLocaleDataExternal, false);
            },
            {
                interval: 50,
                timeout: 1000,
            }
        );

        const localeNameNode = container.querySelector(".locale-name");
        const helloNode = container.querySelector(".hello");
        const helloSmthNode = container.querySelector(".hello-smth");
        const helloWorldNode = container.querySelector(".hello-world");

        expect(localeNameNode?.innerHTML).toBe("ru-RU");
        expect(helloNode?.innerHTML).toBe("Привет");
        expect(helloSmthNode?.innerHTML).toBe("Привет, друг!");
        expect(helloWorldNode?.innerHTML).toBe("Привет, Мир!");

        unmount();
    });

    it("localization provider - on useEffect async", async () => {
        expect.assertions(0);
        let testingLocaleName: LocaleNameType = "en-US";

        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>({
            ...localizationConfig,
            defaultLocaleName: testingLocaleName,
            onUseEffect: (data: LocalizationStateType<LocaleNameType>) => {
                const {localeName: updatedLocaleName} = data;

                testingLocaleName = updatedLocaleName;
            },
        });

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {setLocaleName, isFetchingLocaleData, localeName} = useLocale();

            useEffect(() => {
                // eslint-disable-next-line jest/no-conditional-in-test
                if (!isFetchingLocaleData && localeName !== "ru-RU") {
                    setLocaleName("ru-RU");
                }
            }, [setLocaleName, isFetchingLocaleData, localeName]);

            return <div />;
        }

        const {unmount} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        await waitFor(
            () => {
                assert.equal(testingLocaleName, "ru-RU");
            },
            {interval: 50, timeout: 1000}
        );

        unmount();
    });

    it("locale async", async () => {
        expect.assertions(0);
        let localeNameExternal: LocaleNameType = localizationConfig.defaultLocaleName;
        let isFetchingLocaleDataExternal = false;

        const {LocalizationProvider, useLocale, Locale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {setLocaleName, isFetchingLocaleData, localeName} = useLocale();

            // eslint-disable-next-line sonarjs/no-identical-functions
            useEffect(() => {
                isFetchingLocaleDataExternal = isFetchingLocaleData;
            }, [isFetchingLocaleData]);

            // eslint-disable-next-line sonarjs/no-identical-functions
            useEffect(() => {
                // eslint-disable-next-line jest/no-conditional-in-test
                if (!isFetchingLocaleData && localeName !== "ru-RU") {
                    setLocaleName("ru-RU");
                    localeNameExternal = "ru-RU";
                }
            }, [setLocaleName, isFetchingLocaleData, localeName]);

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
                        <Locale stringKey="HARD_STRING" valueMap={{value1: "value-1", value2: "value-2"}} />
                    </p>
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
                assert.equal(localeNameExternal, "ru-RU");
                assert.equal(isFetchingLocaleDataExternal, false);
            },
            {
                interval: 50,
                timeout: 300,
            }
        );

        await waitFor(
            () => {
                const helloNode = container.querySelector(".hello");
                const helloSmthNode = container.querySelector(".hello-smth");
                const helloHardNode = container.querySelector(".hello-hard");

                assert.equal(helloNode?.innerHTML, "Привет");
                assert.equal(helloSmthNode?.innerHTML, "Привет, <span>друг</span>!");
                assert.equal(helloHardNode?.innerHTML, "эти value-1 данные value-2 есть value-2 здесь");
            },
            {
                interval: 50,
                timeout: 300,
            }
        );

        unmount();
    });

    it("localization provider - change locale name async [variant - 1]", async () => {
        expect.assertions(0);
        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        // eslint-disable-next-line react/no-multi-comp
        function InnerComponent(): JSX.Element {
            const {localeName, setLocaleName, getLocalizedString, isFetchingLocaleData} = useLocale();

            useEffect(() => {
                setLocaleName("ru-RU");
            }, [setLocaleName]);

            // eslint-disable-next-line sonarjs/no-identical-functions
            useEffect(() => {
                // eslint-disable-next-line jest/no-conditional-in-test
                if (!isFetchingLocaleData && localeName !== "ru-RU") {
                    setLocaleName("ru-RU");
                }
            }, [setLocaleName, isFetchingLocaleData, localeName]);

            return (
                <div>
                    <p className="locale-name">{localeName}</p>
                    <p className="hello">{getLocalizedString("HELLO")}</p>
                    <p className="hello-smth">
                        {getLocalizedString("HELLO_SMTH", {smth: getLocalizedString("FRIEND")})}
                    </p>
                    <p className="hello-world">{getLocalizedString("HELLO_WORLD")}</p>
                </div>
            );
        }

        const {unmount, container} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        const localeNameNode = container.querySelector(".locale-name");
        const helloNode = container.querySelector(".hello");
        const helloSmthNode = container.querySelector(".hello-smth");
        const helloWorldNode = container.querySelector(".hello-world");

        await waitFor(
            () => {
                assert.equal(localeNameNode?.innerHTML, "ru-RU");
                assert.equal(helloNode?.innerHTML, "Привет");
                assert.equal(helloSmthNode?.innerHTML, "Привет, друг!");
                assert.equal(helloWorldNode?.innerHTML, "Привет, Мир!");
            },
            {
                interval: 50,
                timeout: 300,
            }
        );

        unmount();
    });

    it("localization helper - fetchLocalizationData", async () => {
        expect.assertions(1);
        const localizationConfigSync: LocalizationConfigType<LocaleKeysType, LocaleNameType> = {
            // eslint-disable-next-line unicorn/no-unused-properties
            defaultLocaleName: "en-US",
            localization: {
                "en-US": enUs,
                "ru-RU": ruRu,
            },
        };

        const localizationData = await fetchLocalizationData<LocaleNameType, LocaleKeysType>(
            "ru-RU",
            localizationConfigSync.localization
        );

        expect(localizationData).toBe(ruRu);
    });
});
