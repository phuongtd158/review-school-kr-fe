<template>
  <a-config-provider>
    <router-view v-slot="{ Component }">
      <transition :name="'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    <global-loading />
    <scroll-to-top />
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import GlobalLoading from '@/components/GlobalLoading/Index.vue';
import ScrollToTop from '@/components/ScrollToTop/Index.vue';
export default defineComponent({
  components: { ScrollToTop, GlobalLoading },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
