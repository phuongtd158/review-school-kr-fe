import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { useLoadingStore } from '@/stores/use-loading-store';
import { message } from 'ant-design-vue';
import { i18n } from '@/i18n';
import { API_SUCCESS_CODE } from '@/constants/app-constants';
import type { ApiResponse, CustomInternalAxiosRequestConfig } from '#/https';
import type { AnySafeType } from '#/index';

export const baseAppURL = (window as AnySafeType).globalConfig.BASE_APP_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL: baseAppURL,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  transformRequest: [
    (data, headers) => {
      if (data instanceof FormData) {
        delete headers['Content-Type'];
        return data;
      }
      return JSON.stringify(data);
    },
  ],
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
  (config: CustomInternalAxiosRequestConfig) => {
    config.maxRetries = config.maxRetries ?? (config.retryCount ?? 0) + 1;

    if (!config.skipLoading) {
      getLoadingStore().startLoading();
    }
    config.headers['Accept-Locale'] =
      typeof i18n.global.locale === 'string' ? i18n.global.locale : i18n.global.locale.value;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as CustomInternalAxiosRequestConfig;
    if (!config?.skipLoading) {
      getLoadingStore().stopLoading();
    }
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      if (data && typeof data === 'object' && 'code' in data) {
        if (data.code && API_SUCCESS_CODE !== data.code) {
          const errorMessage = data.message || translate('da_co_loi_xay_ra');
          if (!config?.skipErrorHandling) {
            message.error(errorMessage);
          }
          return Promise.reject(data);
        }
      }
      return Promise.resolve(data);
    }
    return response.data;
  },
  async (error: AxiosError<ApiResponse>) => {
    const config = error.config as CustomInternalAxiosRequestConfig;
    if (!config?.skipLoading) {
      getLoadingStore().stopLoading();
    }

    if (
      config &&
      config.retryCount !== undefined &&
      config.retryCount < (config.maxRetries || 3) &&
      (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || !error.response)
    ) {
      console.log(`Retrying request (attempt ${config.retryCount}/${config.maxRetries}):`, config.url);
      config.retryCount++;
      const delay = Math.pow(2, config.retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      return apiClient.request(config);
    }

    if (config?.skipErrorHandling) {
      return Promise.reject(error);
    }

    const response = error.response;
    const status = response?.status;
    const data = response?.data;
    let errorMessage = '';

    if (status) {
      switch (status) {
        case 400:
          errorMessage = data?.message || translate('yeu_cau_khong_hop_le');
          break;
        case 401:
          errorMessage = translate('khong_co_quyen_truy_cap');
          break;
        case 403:
          errorMessage = translate('bi_cam_truy_cap');
          break;
        case 404:
          errorMessage = translate('khong_tim_thay_tai_nguyen');
          break;
        case 422:
          errorMessage = data?.message || translate('du_lieu_khong_hop_le');
          break;
        case 429:
          errorMessage = translate('qua_nhieu_yeu_cau');
          break;
        case 500:
          errorMessage = translate('loi_may_chu_noi_bo');
          break;
        case 502:
        case 503:
        case 504:
          errorMessage = translate('may_chu_tam_thoi_khong_kha_dung');
          break;
        default:
          errorMessage = data?.message || translate('da_co_loi_xay_ra');
          break;
      }
    } else {
      if (error.code === 'ECONNABORTED') {
        errorMessage = translate('het_thoi_gian_cho');
      } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = translate('loi_mang');
      } else {
        errorMessage = error.message || translate('loi_khong_xac_dinh');
      }
    }

    if (errorMessage) {
      message.error(errorMessage);
    }

    return Promise.reject(error);
  }
);
