import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import routes from '@/router/defineRouter';
import { setupAfterEach, setupBeforeEach } from '@/router/guard';

const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[],
});

setupBeforeEach(router);
setupAfterEach(router);

export default router;
