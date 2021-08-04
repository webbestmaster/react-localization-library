export enum LocaleNameEnum {
    enUs = 'en-US',
    ruRu = 'ru-RU',
    zhCn = 'zh-CN',
    zhTw = 'zh-TW',
}

export enum ShortLocaleNameEnum {
    en = 'en',
    ru = 'ru',
    zh = 'zh',
}

export type LocaleConstType = Readonly<{
    defaults: {
        localeName: LocaleNameEnum;
        shortLocaleName: ShortLocaleNameEnum;
    };
    key: {
        localStorage: {
            localeName: string;
        };
    };
}>;
