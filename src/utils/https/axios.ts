import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useLoadingStore } from '@/stores/use-loading-store';
import type { AnySafeType } from '#/index';
import { message } from 'ant-design-vue';
import { i18n } from '@/i18n';
import { API_SUCCESS_CODE } from '@/constants/app-constants';

export const baseAppURL = window.globalConfig.BASE_APP_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL: baseAppURL,
  timeout: 180000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Lazy initialize loading store
let loadingStore: ReturnType<typeof useLoadingStore> | null = null;
const translate = i18n.global.t;

const getLoadingStore = () => {
  if (!loadingStore) {
    loadingStore = useLoadingStore();
  }
  return loadingStore;
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { skipLoading?: boolean }) => {
    if (!config.skipLoading) {
      getLoadingStore().startLoading();
    }
    return config;
  },
  (error: AnySafeType) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as AxiosRequestConfig & { skipLoading?: boolean };
    if (!config?.skipLoading) {
      getLoadingStore().stopLoading();
    }
    if (response.status === 200) {
      if (response.data.code && API_SUCCESS_CODE !== response.data.code) {
        message.error(response.data.message || translate('da_co_loi_xay_ra'));
        return Promise.reject(response.data);
      }
      return Promise.resolve(response.data);
    }
    return response.data;
  },
  (error: AnySafeType) => {
    const config = error.config as AxiosRequestConfig & { skipLoading?: boolean };
    if (!config?.skipLoading) {
      getLoadingStore().stopLoading();
    }
    const response = error.response;
    const msg = error.message;
    if (response) {
      const status = response.status;
      switch (status) {
        case 401:
          break;
        case 403:
          break;
        case 500:
          message.error('Internal Server Error');
          break;
        default:
          break;
      }
    } else if (msg) {
      if (msg === 'Network Error') {
        message.error(translate('loi_mang'));
      } else {
        message.error(msg);
      }
    } else {
      message.error('\n' + translate('loi_khong_xac_dinh'));
    }
    return Promise.reject(error);
  }
);
