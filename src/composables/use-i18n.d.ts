import { type SupportedLocale } from '@/i18n';
export declare const useI18n: () => {
    t: (key: string, params?: any) => string;
    locale: import("vue").ComputedRef<"vi" | "en" | "kr">;
    changeLocale: (newLocale: SupportedLocale) => void;
    localeOptions: import("vue").ComputedRef<{
        value: "vi" | "en" | "kr";
        label: string;
        icon: "vi" | "en" | "kr";
    }[]>;
    availableLocales: ("vi" | "en" | "kr")[];
};
