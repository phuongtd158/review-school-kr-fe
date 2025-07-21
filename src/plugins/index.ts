import SvgIcon from '@/components/SvgIcon/Index.vue';
import type { Component } from '#/index';
import mixin from '@/utils/mixins/mixins';
import { message, Modal, notification } from 'ant-design-vue';

export default {
  install(vue: Component): void {
    vue.component('SvgIcon', SvgIcon);

    vue.config.globalProperties.$message = message;
    vue.config.globalProperties.$notification = notification;
    vue.config.globalProperties.$confirm = Modal.confirm;
    vue.config.globalProperties.$info = Modal.info;
    vue.config.globalProperties.$success = Modal.success;
    vue.config.globalProperties.$error = Modal.error;
    vue.config.globalProperties.$warning = Modal.warning;

    vue.mixin(mixin);
  },
};
