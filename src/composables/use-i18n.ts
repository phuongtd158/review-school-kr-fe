import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n';
import { setLocale, LOCALE_NAMES } from '@/i18n';

export const useLocalI18n = () => {
  const { t, locale, availableLocales } = useI18n();

  const currentLocale = computed(() => locale.value as SupportedLocale);

  const changeLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
  };

  const localeOptions = computed(() => {
    return SUPPORTED_LOCALES.map(locale => ({
      value: locale,
      label: LOCALE_NAMES[locale],
    }));
  });

  // Type-safe translation function
  const translate = (key: string, params?: any) => {
    return t(key, params);
  };

  return {
    t: translate,
    locale: currentLocale,
    changeLocale,
    localeOptions,
    availableLocales: availableLocales as SupportedLocale[],
  };
};
