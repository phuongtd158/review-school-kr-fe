import SvgIcon from '@/components/SvgIcon/Index.vue';
import type { Component } from '#/index';
export default {
  install(Vue: Component): void {
    Vue.component('SvgIcon', SvgIcon);
  },
};
