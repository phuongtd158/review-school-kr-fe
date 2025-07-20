import type { Router } from 'vue-router';

export const setupBeforeEach = (router: Router): void => {
  router.beforeEach(async (to, from, next) => {
    next();
  });
};
export const setupAfterEach = (router: Router): void => {
  router.afterEach(() => {});
};
