/* eslint-disable react/no-multi-comp */
import {Context, createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {
    LocaleContextType,
    LocalePropsType,
    LocalizationConfigType,
    LocalizationLibraryType,
    ProviderPropsType,
} from '../library';

import {getLocalizedComponentHelper, getLocalizedString as getLocalizedStringHelper} from './localization-helper';

export function createLocalization<TranslationKeys extends string, LocaleName extends string>(
    localizationConfig: LocalizationConfigType<TranslationKeys, LocaleName>
): LocalizationLibraryType<TranslationKeys, LocaleName> {
    const {defaultLocaleName, localization, onUseEffect = () => null} = localizationConfig;

    const defaultLocalizationData: LocaleContextType<TranslationKeys, LocaleName> = {
        getLocalizedString: String.toString,
        localeName: defaultLocaleName,
        setLocaleName: String.toString,
    };

    const LocaleContext: Context<LocaleContextType<TranslationKeys, LocaleName>> =
        createContext<LocaleContextType<TranslationKeys, LocaleName>>(defaultLocalizationData);

    function LocalizationProvider(props: ProviderPropsType): JSX.Element {
        const {children} = props;

        const [localeName, setLocaleName] = useState<LocaleName>(defaultLocaleName);

        useEffect(() => onUseEffect({localeName}), [localeName]);

        const memoizedSetLocaleName = useCallback((newLocaleName: LocaleName) => setLocaleName(newLocaleName), []);

        const getLocalizedString = useCallback(
            (stringKey: TranslationKeys, valueMap?: Record<string, string>): string =>
                getLocalizedStringHelper<TranslationKeys, LocaleName>(stringKey, localeName, localization, valueMap),
            [localeName]
        );

        const providedData: LocaleContextType<TranslationKeys, LocaleName> = useMemo((): LocaleContextType<
            TranslationKeys,
            LocaleName
        > => {
            return {
                getLocalizedString,
                localeName,
                setLocaleName: memoizedSetLocaleName,
            };
        }, [localeName, memoizedSetLocaleName, getLocalizedString]);

        return <LocaleContext.Provider value={providedData}>{children}</LocaleContext.Provider>;
    }

    function Locale(props: LocalePropsType<TranslationKeys>): JSX.Element {
        // eslint-disable-next-line react/prop-types
        const {stringKey, valueMap} = props;

        const {localeName} = useContext<LocaleContextType<TranslationKeys, LocaleName>>(LocaleContext);

        if (valueMap) {
            return (
                <>
                    {getLocalizedComponentHelper<TranslationKeys, LocaleName>(
                        stringKey,
                        localeName,
                        localization,
                        valueMap
                    )}
                </>
            );
        }

        return <>{getLocalizedStringHelper<TranslationKeys, LocaleName>(stringKey, localeName, localization)}</>;
    }

    function useLocale(): LocaleContextType<TranslationKeys, LocaleName> {
        return useContext<LocaleContextType<TranslationKeys, LocaleName>>(LocaleContext);
    }

    return {Locale, LocalizationProvider, useLocale};
}
