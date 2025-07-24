<template>
  <div class="min-h-screen bg-white">
    <app-header />
    <a-layout-content class="max-w-screen-xl mx-auto px-4 bg-white min-h-[100vh] pt-16 md:pt-16">
      <router-view />
    </a-layout-content>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/Header/Index.vue';
import AppFooter from '@/components/Footer/Index.vue';

export default defineComponent({
  name: 'Layout',
  components: { AppFooter, AppHeader },
  setup() {
    return {};
  },
});
</script>

<style scoped>
:deep(.ant-layout-content) {
  padding-top: 72px;
}

@media (max-width: 767px) {
  :deep(.ant-layout-content) {
    padding-top: 108px;
  }
}
</style>
