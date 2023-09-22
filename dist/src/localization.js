import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-multi-comp */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchLocalizationData, getLocalizedComponentHelper, getLocalizedString as getLocalizedStringHelper, } from "./localization-helper";
import { placeholderText } from "./localization-const";
import { waitForTime } from "./util/timer";
export function createLocalization(localizationConfig) {
    const { defaultLocaleName, localization: localizationArgument, onUseEffect = () => {
        return null;
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
            if (forcedLocaleName) {
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
            // eslint-disable-next-line promise/catch-or-return, @typescript-eslint/no-floating-promises
            fetchLocalizationData(localeName, localization)
                .then((localizationData) => {
                // Make sure that React's circle is updated, needed to update async locale
                // eslint-disable-next-line promise/no-nesting
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
        // eslint-disable-next-line react/prop-types
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
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return _jsx(_Fragment, { children: placeholderText });
    }
    function useLocale() {
        return useContext(LocaleContext);
    }
    return { Locale, LocalizationProvider, useLocale };
}
//# sourceMappingURL=localization.js.map