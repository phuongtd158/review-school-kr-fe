import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import Antd from 'ant-design-vue';
import mixin from '@/utils/mixins/mixins';
import { i18n, initializeLocale } from '@/i18n/index';
import plugins from '@/plugins';
import 'virtual:svg-icons-register';
import router from '@/router';

const app = createApp(App);
app.use(Antd);
app.mixin(mixin);
initializeLocale();
app.use(i18n);
app.use(plugins);
app.use(router);
app.mount('#app');
