/* global window, document, navigator */
import {RectangleSizeType, ScreenWidthNameEnum, SystemScreenDataType} from './system-hook-type';
import {defaultScreenSize, screenMinWidth} from './system-hook-const';

function getScreenName(screenWidth: number): ScreenWidthNameEnum {
    if (screenWidth >= screenMinWidth[ScreenWidthNameEnum.desktop]) {
        return ScreenWidthNameEnum.desktop;
    }

    if (screenWidth >= screenMinWidth[ScreenWidthNameEnum.tablet]) {
        return ScreenWidthNameEnum.tablet;
    }

    return ScreenWidthNameEnum.mobile;
}

export function getScreenSize(): RectangleSizeType {
    if (typeof document === 'undefined') {
        return defaultScreenSize;
    }

    const {documentElement} = document;

    if (!documentElement) {
        return defaultScreenSize;
    }

    const {clientWidth: width, clientHeight: height} = documentElement;

    return {height, width};
}

export function getDevicePixelRatio(): number {
    const defaultDevicePixelRatio = 2;

    if (typeof window === 'undefined') {
        return defaultDevicePixelRatio;
    }

    const {devicePixelRatio} = window;

    if (typeof devicePixelRatio !== 'number' || Number.isNaN(devicePixelRatio)) {
        return defaultDevicePixelRatio;
    }

    if (devicePixelRatio <= defaultDevicePixelRatio) {
        return defaultDevicePixelRatio;
    }

    return devicePixelRatio;
}

export function getScreenState(width: number, height: number): SystemScreenDataType {
    const isLandscape = width > height; // use >, do not use >=, if width === height it is portrait
    const screenName = getScreenName(width);

    return {
        devicePixelRatio: getDevicePixelRatio(),
        isDesktop: screenName === ScreenWidthNameEnum.desktop,
        isLandscape,
        isMobile: screenName === ScreenWidthNameEnum.mobile,
        isPortrait: !isLandscape,
        isTablet: screenName === ScreenWidthNameEnum.tablet,
        name: screenName,
    };
}

export function getIsIOS(): boolean {
    if (typeof navigator === 'undefined') {
        return false;
    }

    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export function getIsAndroid(): boolean {
    if (typeof navigator === 'undefined') {
        return false;
    }

    return /(android)/i.test(navigator.userAgent);
}
