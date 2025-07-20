import type { Router } from '#/index';
import Layout from '@/layout/Layout.vue';
import Home from '@/view/Home/Index.vue';

const routers: Router[] = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      title: 'title.trang_tru',
    },
  },
];

const routes: Router[] = [
  {
    path: '',
    name: 'index',
    redirect: { name: 'home' },
    component: Layout,
    meta: {
      title: 'title.trang_tru',
    },
    children: routers,
  },
];

export default routes;
