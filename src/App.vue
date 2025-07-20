<template>
  <a-config-provider>
    <router-view v-slot="{ Component }">
      <transition :name="'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
