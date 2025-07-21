import Layout from '@/layout/Layout.vue';
import Home from '@/view/Home/Index.vue';
import type { RouteRecordRaw } from 'vue-router';

const routers: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      title: 'title.trang_tru',
    },
  },
];

const routes: RouteRecordRaw[] = [
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
