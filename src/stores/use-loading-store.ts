import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const loadingCount = ref(0);

  const startLoading = () => {
    loadingCount.value++;
  };

  const stopLoading = () => {
    loadingCount.value = Math.max(loadingCount.value - 1, 0);
  };

  const isLoading = computed(() => loadingCount.value > 0);

  return { isLoading, startLoading, stopLoading };
});
