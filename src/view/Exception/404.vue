<template>
  <a-result status="404" title="404" :sub-title="t('404_title')">
    <template #extra>
      <a-button type="primary" @click="toHome"> {{ t('tro_ve') }} </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalI18n } from '@/composables/use-i18n';

export default defineComponent({
  name: 'Exception404',
  setup() {
    const router = useRouter();
    const { t } = useLocalI18n();

    const toHome = () => {
      router.push({ path: '/' });
    };

    return { toHome, t };
  },
});
</script>
