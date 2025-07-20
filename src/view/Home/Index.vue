<template>
  <div class="text-red-500">{{ t('xin_chao') }}</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from '@/composables/use-i18n';
export default defineComponent({
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>
<style scoped></style>
