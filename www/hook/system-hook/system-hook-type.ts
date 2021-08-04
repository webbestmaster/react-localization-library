export enum ScreenWidthNameEnum {
    'desktop' = 'desktop',
    'mobile' = 'mobile',
    'tablet' = 'tablet',
}

export type RectangleSizeType = Readonly<{
    height: number;
    width: number;
}>;

export type SystemScreenDataType = Readonly<{
    devicePixelRatio: number;
    isDesktop: boolean;
    isLandscape: boolean;
    isMobile: boolean;
    isPortrait: boolean;
    isTablet: boolean;
    name: ScreenWidthNameEnum;
}>;

export type SystemHookType = Readonly<{
    isAndroid: boolean;
    isBrowser: boolean;
    isIOS: boolean;
    screen: SystemScreenDataType;
}>;
