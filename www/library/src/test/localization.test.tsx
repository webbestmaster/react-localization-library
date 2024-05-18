/* eslint-disable sonarjs/no-duplicate-string */

import {useEffect} from "react";

import {render} from "@testing-library/react";
import {describe, it, expect} from "@jest/globals";

import {createLocalization, type LocalizationConfigType, type LocalizationStateType} from "../../library";

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
        "en-US": enUs,
        "ru-RU": ruRu,
    },
};

describe("localization", () => {
    it("localization provider", () => {
        expect.assertions(4);
        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        function InnerComponent(): JSX.Element {
            const {localeName, getLocalizedString} = useLocale();

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

        expect(localeNameNode?.innerHTML).toBe("en-US");
        expect(helloNode?.innerHTML).toBe("Hello");
        expect(helloSmthNode?.innerHTML).toBe("Hello, friend!");
        expect(helloWorldNode?.innerHTML).toBe("Hello, World!");

        unmount();
    });

    it("localization provider - change locale name", () => {
        expect.assertions(4);
        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        function InnerComponent(): JSX.Element {
            const {localeName, setLocaleName, getLocalizedString} = useLocale();

            useEffect(() => {
                setLocaleName("ru-RU");
            }, [setLocaleName]);

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

        expect(localeNameNode?.innerHTML).toBe("ru-RU");
        expect(helloNode?.innerHTML).toBe("Привет");
        expect(helloSmthNode?.innerHTML).toBe("Привет, друг!");
        expect(helloWorldNode?.innerHTML).toBe("Привет, Мир!");

        unmount();
    });

    it("localization provider - on useEffect", () => {
        expect.assertions(1);
        let testingLocaleName: LocaleNameType = "en-US";

        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>({
            ...localizationConfig,
            defaultLocaleName: testingLocaleName,
            onUseEffect: (data: LocalizationStateType<LocaleNameType>) => {
                const {localeName: updatedLocaleName} = data;

                testingLocaleName = updatedLocaleName;
            },
        });

        function InnerComponent(): JSX.Element {
            const {setLocaleName} = useLocale();

            useEffect(() => {
                setLocaleName("ru-RU");
            }, [setLocaleName]);

            return <div />;
        }

        const {unmount} = render(
            <LocalizationProvider>
                <InnerComponent />
            </LocalizationProvider>
        );

        expect(testingLocaleName).toBe("ru-RU");

        unmount();
    });

    it("localization provider - use forced locale name", () => {
        expect.assertions(1);
        let testingLocaleName: LocaleNameType = "en-US";

        const {LocalizationProvider, useLocale} = createLocalization<LocaleKeysType, LocaleNameType>({
            ...localizationConfig,
            defaultLocaleName: testingLocaleName,
        });

        function InnerComponent(): JSX.Element {
            const {localeName} = useLocale();

            testingLocaleName = localeName;

            return <div />;
        }

        const {unmount} = render(
            <LocalizationProvider forcedLocaleName="ru-RU">
                <InnerComponent />
            </LocalizationProvider>
        );

        expect(testingLocaleName).toBe("ru-RU");

        unmount();
    });

    it("locale", () => {
        expect.assertions(3);
        const {LocalizationProvider, useLocale, Locale} = createLocalization<LocaleKeysType, LocaleNameType>(
            localizationConfig
        );

        function InnerComponent(): JSX.Element {
            const {setLocaleName} = useLocale();

            useEffect(() => {
                setLocaleName("ru-RU");
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

        const helloNode = container.querySelector(".hello");
        const helloSmthNode = container.querySelector(".hello-smth");
        const helloHardNode = container.querySelector(".hello-hard");

        expect(helloNode?.innerHTML).toBe("Привет");
        expect(helloSmthNode?.innerHTML).toBe("Привет, <span>друг</span>!");
        expect(helloHardNode?.innerHTML).toBe("эти value-1 данные value-2 есть value-2 здесь");

        unmount();
    });
});
