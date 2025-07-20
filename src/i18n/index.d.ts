export declare const SUPPORTED_LOCALES: readonly ["en", "vi", "kr"];
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export declare const LOCALE_NAMES: Record<SupportedLocale, string>;
export declare const i18n: import("vue-i18n").I18n<{
    en: {
        xin_chao: string;
    };
    vi: {
        xin_chao: string;
    };
    kr: {
        xin_chao: string;
    };
}, {}, {}, string, false>;
export declare const getCurrentLocale: () => SupportedLocale;
export declare const setLocale: (locale: SupportedLocale) => void;
export declare const getStoredLocale: () => SupportedLocale | null;
export declare const getBrowserLocale: () => SupportedLocale;
export declare const initializeLocale: () => void;
