<template>
  <teleport to="body">
    <transition
      name="loading"
      enter-active-class="transition-opacity duration-200 ease-out"
      leave-active-class="transition-opacity duration-200 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="isLoading"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
        role="dialog"
        aria-label="Loading"
        aria-live="polite">
        <div class="loader" aria-hidden="true"></div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useLoadingStore } from '@/stores/use-loading-store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'GlobalLoading',
  setup() {
    const loadingStore = useLoadingStore();
    const { isLoading } = storeToRefs(loadingStore);
    return { isLoading };
  },
});
</script>
<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
