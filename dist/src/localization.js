import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { placeholderText } from "./localization-const";
import { fetchLocalizationData, getLocalizedComponentHelper, getLocalizedString as getLocalizedStringHelper, } from "./localization-helper";
import { waitForTime } from "./util/timer";
export function createLocalization(localizationConfig) {
    const { defaultLocaleName, localization: localizationArgument, onUseEffect = () => {
        // eslint-disable-next-line no-undefined
        return undefined;
    }, } = localizationConfig;
    let previousLocalizationName = defaultLocaleName;
    const localization = { ...localizationArgument };
    const defaultLocalizationData = {
        // eslint-disable-next-line @typescript-eslint/unbound-method, jest/unbound-method
        getLocalizedString: String.toString,
        isFetchingLocaleData: typeof localization[defaultLocaleName] === "function",
        localeName: defaultLocaleName,
        // eslint-disable-next-line @typescript-eslint/unbound-method, jest/unbound-method
        setLocaleName: String.toString,
    };
    const LocaleContext = createContext(defaultLocalizationData);
    function LocalizationProvider(props) {
        const { children, forcedLocaleName } = props;
        const [localeName, setLocaleName] = useState(forcedLocaleName !== null && forcedLocaleName !== void 0 ? forcedLocaleName : defaultLocalizationData.localeName);
        const [isFetchingLocaleData, setIsFetchingLocaleData] = useState(defaultLocalizationData.isFetchingLocaleData);
        useEffect(() => {
            if (typeof forcedLocaleName === "string" && forcedLocaleName.trim() !== "") {
                setLocaleName(forcedLocaleName);
            }
        }, [forcedLocaleName]);
        useEffect(() => {
            const existsLocalizationData = localization[localeName];
            // Check localization data already exists
            if (typeof existsLocalizationData !== "function") {
                previousLocalizationName = localeName;
                onUseEffect({ isFetchingLocaleData: false, localeName });
                return;
            }
            setIsFetchingLocaleData(true);
            onUseEffect({ isFetchingLocaleData: true, localeName: previousLocalizationName });
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetchLocalizationData(localeName, localization)
                .then(async (localizationData) => {
                // Make sure that React's circle is updated, needed to update async locale
                return waitForTime(0).then(() => {
                    localization[localeName] = localizationData;
                    previousLocalizationName = localeName;
                    onUseEffect({ isFetchingLocaleData: false, localeName });
                });
            })
                .finally(() => {
                setIsFetchingLocaleData(false);
            });
        }, [localeName, setIsFetchingLocaleData]);
        const memoizedSetLocaleName = useCallback((updatedLocaleName) => {
            if (isFetchingLocaleData) {
                console.log("do not change locale name while localizing data loading");
                return;
            }
            setLocaleName(updatedLocaleName);
        }, [isFetchingLocaleData]);
        const getLocalizedString = useCallback((stringKey, valueMap) => {
            const existsLocalizationData = localization[localeName];
            const previousLocalizationData = localization[previousLocalizationName];
            if (isFetchingLocaleData && typeof previousLocalizationData !== "function") {
                return getLocalizedStringHelper(stringKey, localeName, previousLocalizationData, valueMap);
            }
            if (typeof existsLocalizationData !== "function") {
                return getLocalizedStringHelper(stringKey, localeName, existsLocalizationData, valueMap);
            }
            if (typeof previousLocalizationData !== "function") {
                return getLocalizedStringHelper(stringKey, localeName, previousLocalizationData, valueMap);
            }
            console.log("There is no localization data, return string");
            return placeholderText;
        }, [localeName, isFetchingLocaleData]);
        const providedData = useMemo(() => {
            return {
                getLocalizedString,
                isFetchingLocaleData,
                localeName,
                setLocaleName: memoizedSetLocaleName,
            };
        }, [localeName, memoizedSetLocaleName, getLocalizedString, isFetchingLocaleData]);
        return _jsx(LocaleContext.Provider, { value: providedData, children: children });
    }
    function Locale(props) {
        const { stringKey, valueMap = {} } = props;
        const { localeName } = useContext(LocaleContext);
        const existsLocalizationData = localization[localeName];
        const previousLocalizationData = localization[previousLocalizationName];
        if (typeof existsLocalizationData !== "function") {
            return (_jsx(_Fragment, { children: getLocalizedComponentHelper(stringKey, localeName, existsLocalizationData, valueMap) }));
        }
        if (typeof previousLocalizationData !== "function") {
            return (_jsx(_Fragment, { children: getLocalizedComponentHelper(stringKey, localeName, previousLocalizationData, valueMap) }));
        }
        console.log("There is no localization data, return jsx");
        return _jsx(_Fragment, { children: placeholderText });
    }
    function useLocale() {
        return useContext(LocaleContext);
    }
    return { Locale, LocalizationProvider, useLocale };
}
//# sourceMappingURL=localization.js.map