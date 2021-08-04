/* global window */

import {useCallback, useEffect, useMemo, useState} from 'react';

import {debounce} from '../../util/function';

import {ScreenWidthNameEnum, SystemHookType, SystemScreenDataType} from './system-hook-type';
import {getIsAndroid, getIsIOS, getScreenSize, getScreenState} from './system-hook-helper';

export function useSystem(): SystemHookType {
    const isAndroid = getIsAndroid();
    const isBrowser = typeof window !== 'undefined';
    const isIOS = getIsIOS();

    const {width: defaultWidth, height: defaultHeight} = getScreenSize();

    const {
        devicePixelRatio: defaultDevicePixelRatio,
        isDesktop: defaultIsDesktop,
        isLandscape: defaultIsLandscape,
        isMobile: defaultIsMobile,
        isPortrait: defaultIsPortrait,
        isTablet: defaultIsTablet,
        name: defaultName,
    } = getScreenState(defaultWidth, defaultHeight);

    const [devicePixelRatio, setDevicePixelRatio] = useState<number>(defaultDevicePixelRatio);
    const [isDesktop, setIsDesktop] = useState<boolean>(defaultIsDesktop);
    const [isLandscape, setIsLandscape] = useState<boolean>(defaultIsLandscape);
    const [isMobile, setIsMobile] = useState<boolean>(defaultIsMobile);
    const [isPortrait, setIsPortrait] = useState<boolean>(defaultIsPortrait);
    const [isTablet, setIsTablet] = useState<boolean>(defaultIsTablet);
    const [name, setName] = useState<ScreenWidthNameEnum>(defaultName);

    const handleResize = useCallback(() => {
        const {width: newWidth, height: newHeight} = getScreenSize();

        const {
            devicePixelRatio: newDevicePixelRatio,
            isDesktop: newIsDesktop,
            isLandscape: newIsLandscape,
            isMobile: newIsMobile,
            isPortrait: newIsPortrait,
            isTablet: newIsTablet,
            name: newName,
        } = getScreenState(newWidth, newHeight);

        setDevicePixelRatio(newDevicePixelRatio);
        setIsDesktop(newIsDesktop);
        setIsLandscape(newIsLandscape);
        setIsMobile(newIsMobile);
        setIsPortrait(newIsPortrait);
        setIsTablet(newIsTablet);
        setName(newName);
    }, []);

    useEffect(() => {
        const handleResizeDebounced = debounce<[]>(handleResize, 150);

        window.addEventListener('resize', handleResizeDebounced, {capture: false, passive: true});

        return () => {
            window.removeEventListener('resize', handleResizeDebounced, {capture: false});
        };
    }, [handleResize]);

    const systemScreen: SystemScreenDataType = useMemo((): SystemScreenDataType => {
        return {
            devicePixelRatio,
            isDesktop,
            isLandscape,
            isMobile,
            isPortrait,
            isTablet,
            name,
        };
    }, [devicePixelRatio, isDesktop, isLandscape, isMobile, isPortrait, isTablet, name]);

    return useMemo((): SystemHookType => {
        return {isAndroid, isBrowser, isIOS, screen: systemScreen};
    }, [isAndroid, isBrowser, isIOS, systemScreen]);
}
