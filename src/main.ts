import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import Antd from 'ant-design-vue';
import { i18n, initializeLocale } from '@/i18n';
import plugins from '@/plugins';
import 'virtual:svg-icons-register';
import router from '@/router';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(Antd);
app.use(i18n);
initializeLocale();
app.use(plugins);
app.use(router);
app.use(createPinia());
app.mount('#app');
