<template>
  <div class="text-red-500">{{ t('xin_chao') }}</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useLocalI18n } from '@/composables/use-i18n';
import { callApiTest } from '@/service/home';
export default defineComponent({
  setup() {
    const { t } = useLocalI18n();
    onMounted(async () => {
      try {
        const { body } = await callApiTest({ code: 'code', name: 'name' });
        console.log(body);
      } catch (e) {
        console.log(e);
      }
    });
    return { t };
  },
});
</script>
<style scoped></style>
