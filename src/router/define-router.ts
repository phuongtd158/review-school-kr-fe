import Layout from '@/layout/Layout.vue';
import Home from '@/view/Home/Index.vue';
import UniversityDetail from '@/view/UniversityDetail/Index.vue';
import View404 from '@/view/Exception/404.vue';
import Search from '@/view/Search/Index.vue';
import type { RouteRecordRaw } from 'vue-router';

const routers: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      title: 'title.trang_chu',
    },
  },
  {
    path: '/university/:code',
    name: 'university-detail',
    component: UniversityDetail,
    meta: {
      title: 'title.chi_tiet',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      title: 'title.tim_kiem',
    },
  },
  {
    path: '/:path(.*)',
    name: 'not-found',
    component: View404,
    meta: {
      title: 'title.not_found',
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
