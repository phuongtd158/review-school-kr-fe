import type { Router } from 'vue-router';
import { i18n } from '@/i18n';

export const setupBeforeEach = (router: Router): void => {
  router.beforeEach(async (to, from, next) => {
    const defaultTitle = 'Review University';
    document.title = to.meta?.title ? i18n.global.t(to.meta.title as string) : defaultTitle;
    next();
  });
};
export const setupAfterEach = (router: Router): void => {
  router.afterEach(() => {});
};
