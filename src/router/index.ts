import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/define-router';
import { setupAfterEach, setupBeforeEach } from '@/router/guard';

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

setupBeforeEach(router);
setupAfterEach(router);

export default router;
