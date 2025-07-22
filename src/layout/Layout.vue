<template>
  <div class="min-h-screen bg-white">
    <app-header />
    <main class="bg-white min-h-[800px] pt-16 md:pt-16">
      <router-view />
    </main>
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
main {
  padding-top: 72px;
}

@media (max-width: 768px) {
  main {
    padding-top: 104px;
  }
}
</style>
