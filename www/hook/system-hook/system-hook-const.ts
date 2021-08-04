import {RectangleSizeType, ScreenWidthNameEnum} from './system-hook-type';

export const screenMinWidth: {[key in ScreenWidthNameEnum]: number} = {
    [ScreenWidthNameEnum.desktop]: 980,
    [ScreenWidthNameEnum.mobile]: 320,
    [ScreenWidthNameEnum.tablet]: 768,
};

export const defaultScreenSize: RectangleSizeType = {
    height: screenMinWidth.tablet,
    width: screenMinWidth.desktop,
};
