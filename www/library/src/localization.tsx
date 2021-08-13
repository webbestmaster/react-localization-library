/* eslint-disable react/no-multi-comp */
import {Context, createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {
    LocaleContextType,
    LocalePropsType,
    LocalizationConfigType,
    LocalizationLibraryType,
    ProviderPropsType,
} from '../library';

import {getLocalizedString as getLocalizedStringHelper} from './localization-helper';
import {splitValueStringRegExp} from './localization-const';
import {DefaultValuesMapType} from './localization-type';

export function createLocalization<
    TranslationKeys extends string,
    LocaleName extends string,
    ValuesMapType extends DefaultValuesMapType<TranslationKeys>
>(
    localizationConfig: LocalizationConfigType<TranslationKeys, LocaleName>
): LocalizationLibraryType<TranslationKeys, LocaleName, ValuesMapType> {
    const {defaultLocaleName, localization, onUseEffect = () => null} = localizationConfig;

    const defaultLocalizationData: LocaleContextType<TranslationKeys, LocaleName, ValuesMapType> = {
        getLocalizedString: String.toString,
        localeName: defaultLocaleName,
        setLocaleName: String.toString,
    };

    const LocaleContext: Context<LocaleContextType<TranslationKeys, LocaleName, ValuesMapType>> =
        createContext<LocaleContextType<TranslationKeys, LocaleName, ValuesMapType>>(defaultLocalizationData);

    function LocalizationProvider(props: ProviderPropsType): JSX.Element {
        const {children} = props;

        const [localeName, setLocaleName] = useState<LocaleName>(defaultLocaleName);

        useEffect(() => onUseEffect({localeName}), [localeName]);

        const memoizedSetLocaleName = useCallback((newLocaleName: LocaleName) => setLocaleName(newLocaleName), []);

        const getLocalizedString = useCallback(
            <TextType extends TranslationKeys>(stringKey: TextType, valueMap?: ValuesMapType[TextType]): string =>
                getLocalizedStringHelper<TranslationKeys, LocaleName, ValuesMapType[TextType]>(
                    stringKey,
                    localeName,
                    localization,
                    valueMap
                ),
            [localeName]
        );

        const providedData: LocaleContextType<TranslationKeys, LocaleName, ValuesMapType> =
            useMemo((): LocaleContextType<TranslationKeys, LocaleName, ValuesMapType> => {
                return {
                    getLocalizedString,
                    localeName,
                    setLocaleName: memoizedSetLocaleName,
                };
            }, [localeName, memoizedSetLocaleName, getLocalizedString]);

        return <LocaleContext.Provider value={providedData}>{children}</LocaleContext.Provider>;
    }

    function Locale<TextType extends TranslationKeys>(
        props: LocalePropsType<TranslationKeys, TextType, ValuesMapType>
    ): JSX.Element {
        const {stringKey, valueMap} = props;

        const {localeName} = useContext<LocaleContextType<TranslationKeys, LocaleName, ValuesMapType>>(LocaleContext);

        if (!valueMap) {
            return (
                <>
                    {getLocalizedStringHelper<TranslationKeys, LocaleName, ValuesMapType>(
                        stringKey,
                        localeName,
                        localization
                    )}
                </>
            );
        }

        const resultString = localization[localeName][stringKey]; // 'the {value1} data {value2} is {value2} here'

        let partList: Array<JSX.Element | string> = resultString.split(splitValueStringRegExp); // ["the ", "{value1} data ", "{value2} is ", "{value2} here"]

        const keyList = Object.keys(valueMap);

        // eslint-disable-next-line no-loops/no-loops
        for (const objectKey of keyList) {
            partList = partList.map((part: JSX.Element | string, index: number): JSX.Element | string => {
                if (typeof part !== 'string') {
                    return part;
                }

                const replacedPart = '{' + objectKey + '}';

                if (!part.startsWith(replacedPart)) {
                    return part;
                }

                const endOfString = part.slice(replacedPart.length);

                return (
                    <Fragment key={String(objectKey + '-' + index)}>
                        {valueMap[objectKey]}
                        {endOfString}
                    </Fragment>
                );
            });
        }

        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{partList}</>;
    }

    function useLocale(): LocaleContextType<TranslationKeys, LocaleName, ValuesMapType> {
        return useContext<LocaleContextType<TranslationKeys, LocaleName, ValuesMapType>>(LocaleContext);
    }

    return {Locale, LocalizationProvider, useLocale};
}
