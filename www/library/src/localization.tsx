/* eslint-disable react/no-multi-comp */
import {type Context, createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";

import type {
    LocaleContextType,
    LocalePropsType,
    LocalizationConfigType,
    LocalizationLibraryType,
    ProviderPropsType,
} from "../library";

import {
    fetchLocalizationData,
    getLocalizedComponentHelper,
    getLocalizedString as getLocalizedStringHelper,
} from "./localization-helper";
import type {LocalizationDataType, LocalizationType, RawLocalizationDataType} from "./localization-type";
import {placeholderText} from "./localization-const";
import {waitForTime} from "./util/timer";

export function createLocalization<TranslationKeys extends string, LocaleName extends string>(
    localizationConfig: LocalizationConfigType<TranslationKeys, LocaleName>
): LocalizationLibraryType<TranslationKeys, LocaleName> {
    const {
        defaultLocaleName,
        localization: localizationArgument,
        onUseEffect = () => {
            return null;
        },
    } = localizationConfig;
    let previousLocalizationName: LocaleName = defaultLocaleName;

    const localization: LocalizationType<LocaleName, TranslationKeys> = {...localizationArgument};

    const defaultLocalizationData: LocaleContextType<TranslationKeys, LocaleName> = {
        // eslint-disable-next-line @typescript-eslint/unbound-method, jest/unbound-method
        getLocalizedString: String.toString,
        isFetchingLocaleData: typeof localization[defaultLocaleName] === "function",
        localeName: defaultLocaleName,
        // eslint-disable-next-line @typescript-eslint/unbound-method, jest/unbound-method
        setLocaleName: String.toString,
    };

    const LocaleContext: Context<LocaleContextType<TranslationKeys, LocaleName>> =
        createContext<LocaleContextType<TranslationKeys, LocaleName>>(defaultLocalizationData);

    function LocalizationProvider(props: ProviderPropsType<LocaleName>): JSX.Element {
        const {children, forcedLocaleName} = props;

        const [localeName, setLocaleName] = useState<LocaleName>(
            forcedLocaleName ?? defaultLocalizationData.localeName
        );
        const [isFetchingLocaleData, setIsFetchingLocaleData] = useState<boolean>(
            defaultLocalizationData.isFetchingLocaleData
        );

        useEffect(() => {
            if (forcedLocaleName) {
                setLocaleName(forcedLocaleName);
            }
        }, [forcedLocaleName]);

        useEffect(() => {
            const existsLocalizationData: RawLocalizationDataType<TranslationKeys> = localization[localeName];

            // Check localization data already exists
            if (typeof existsLocalizationData !== "function") {
                previousLocalizationName = localeName;
                onUseEffect({isFetchingLocaleData: false, localeName});
                return;
            }

            setIsFetchingLocaleData(true);
            onUseEffect({isFetchingLocaleData: true, localeName: previousLocalizationName});

            // eslint-disable-next-line promise/catch-or-return, @typescript-eslint/no-floating-promises
            fetchLocalizationData<LocaleName, TranslationKeys>(localeName, localization)
                .then((localizationData: LocalizationDataType<TranslationKeys>) => {
                    // Make sure that React's circle is updated, needed to update async locale
                    // eslint-disable-next-line promise/no-nesting
                    return waitForTime(0).then(() => {
                        localization[localeName] = localizationData;
                        previousLocalizationName = localeName;

                        onUseEffect({isFetchingLocaleData: false, localeName});
                    });
                })
                .finally((): void => {
                    setIsFetchingLocaleData(false);
                });
        }, [localeName, setIsFetchingLocaleData]);

        const memoizedSetLocaleName = useCallback(
            (updatedLocaleName: LocaleName) => {
                if (isFetchingLocaleData) {
                    console.log("do not change locale name while localizing data loading");
                    return;
                }
                setLocaleName(updatedLocaleName);
            },
            [isFetchingLocaleData]
        );

        const getLocalizedString = useCallback(
            (stringKey: TranslationKeys, valueMap?: Record<string, string>): string => {
                const existsLocalizationData: RawLocalizationDataType<TranslationKeys> = localization[localeName];
                const previousLocalizationData: RawLocalizationDataType<TranslationKeys> =
                    localization[previousLocalizationName];

                if (isFetchingLocaleData && typeof previousLocalizationData !== "function") {
                    return getLocalizedStringHelper<TranslationKeys, LocaleName>(
                        stringKey,
                        localeName,
                        previousLocalizationData,
                        valueMap
                    );
                }

                if (typeof existsLocalizationData !== "function") {
                    return getLocalizedStringHelper<TranslationKeys, LocaleName>(
                        stringKey,
                        localeName,
                        existsLocalizationData,
                        valueMap
                    );
                }

                if (typeof previousLocalizationData !== "function") {
                    return getLocalizedStringHelper<TranslationKeys, LocaleName>(
                        stringKey,
                        localeName,
                        previousLocalizationData,
                        valueMap
                    );
                }

                console.log("There is no localization data, return string");

                return placeholderText;
            },
            [localeName, isFetchingLocaleData]
        );

        const providedData: LocaleContextType<TranslationKeys, LocaleName> = useMemo((): LocaleContextType<
            TranslationKeys,
            LocaleName
        > => {
            return {
                getLocalizedString,
                isFetchingLocaleData,
                localeName,
                setLocaleName: memoizedSetLocaleName,
            };
        }, [localeName, memoizedSetLocaleName, getLocalizedString, isFetchingLocaleData]);

        return <LocaleContext.Provider value={providedData}>{children}</LocaleContext.Provider>;
    }

    function Locale(props: LocalePropsType<TranslationKeys>): JSX.Element {
        // eslint-disable-next-line react/prop-types
        const {stringKey, valueMap = {}} = props;

        const {localeName} = useContext<LocaleContextType<TranslationKeys, LocaleName>>(LocaleContext);

        const existsLocalizationData: RawLocalizationDataType<TranslationKeys> = localization[localeName];
        const previousLocalizationData: RawLocalizationDataType<TranslationKeys> =
            localization[previousLocalizationName];

        if (typeof existsLocalizationData !== "function") {
            return (
                <>
                    {getLocalizedComponentHelper<TranslationKeys, LocaleName>(
                        stringKey,
                        localeName,
                        existsLocalizationData,
                        valueMap
                    )}
                </>
            );
        }

        if (typeof previousLocalizationData !== "function") {
            return (
                <>
                    {getLocalizedComponentHelper<TranslationKeys, LocaleName>(
                        stringKey,
                        localeName,
                        previousLocalizationData,
                        valueMap
                    )}
                </>
            );
        }

        console.log("There is no localization data, return jsx");

        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{placeholderText}</>;
    }

    function useLocale(): LocaleContextType<TranslationKeys, LocaleName> {
        return useContext<LocaleContextType<TranslationKeys, LocaleName>>(LocaleContext);
    }

    return {Locale, LocalizationProvider, useLocale};
}
