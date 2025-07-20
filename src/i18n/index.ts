import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import vi from './locales/vi.json';
import kr from './locales/kr.json';
import { storage } from '@/utils/storage';
export const LOCALE_CODE = {
  KOREA: 'kr',
  ENGLISH: 'en',
  VIETNAM: 'vi',
};
export const SUPPORTED_LOCALES = [LOCALE_CODE.ENGLISH, LOCALE_CODE.VIETNAM, LOCALE_CODE.KOREA] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  kr: '한국어',
};

export const i18n = createI18n({
  legacy: false, // Sử dụng Composition API
  locale: 'vi',
  fallbackLocale: 'en',
  messages: {
    en,
    vi,
    kr,
  },
});

export const getCurrentLocale = (): SupportedLocale => {
  return i18n.global.locale.value as SupportedLocale;
};

export const setLocale = (locale: SupportedLocale): void => {
  i18n.global.locale.value = locale;
  // Lưu vào localStorage
  storage.set('locale', locale);
  // Cập nhật document lang attribute
  document.documentElement.lang = locale;
};

export const getStoredLocale = (): SupportedLocale | null => {
  const stored = storage.get('locale');
  return SUPPORTED_LOCALES.includes(stored as SupportedLocale) ? (stored as SupportedLocale) : null;
};

// Detect browser language
export const getBrowserLocale = (): SupportedLocale => {
  const browserLang = navigator.language.split('-')[0] as SupportedLocale;
  return SUPPORTED_LOCALES.includes(browserLang) ? browserLang : 'en';
};

// Initialize locale with priority: stored > browser > default
export const initializeLocale = (): void => {
  const storedLocale = getStoredLocale();
  const browserLocale = getBrowserLocale();
  const initialLocale = storedLocale || browserLocale;
  setLocale(initialLocale);
};
