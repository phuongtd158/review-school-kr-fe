<template>
  <a-layout>
    <app-header />
    <a-layout-content class="!bg-white h-[1800px] pt-[64px]">
      <router-view />
    </a-layout-content>
    <app-footer />
  </a-layout>
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

<style scoped></style>
