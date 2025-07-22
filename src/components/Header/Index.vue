<template>
  <a-layout-header class="fixed top-0 left-0 w-full z-50 !bg-white shadow-sm">
    <div class="max-w-screen-xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <svg-icon name="vite" />
        <span class="text-xl font-semibold text-gray-800 whitespace-nowrap">REVIEW UNIVERSITY</span>
      </div>
      <search-dropdown />
      <div class="flex items-center gap-2">
        <a-button
          type="primary"
          shape="round"
          class="bg-blue-600 hover:bg-blue-700 border-none text-white whitespace-nowrap"
          :icon="h(PlusOutlined)">
          {{ t('yeu_cau_them_truong_hoc') }}
        </a-button>
        <language-switcher />
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import LanguageSwitcher from '@/components/LanguageSwitcher/Index.vue';
import { useLocalI18n } from '@/composables/use-i18n';
import SearchDropdown from '@/components/SearchDropdown/Index.vue';

export default defineComponent({
  name: 'AppHeader',
  components: { SearchDropdown, LanguageSwitcher, PlusOutlined },
  setup() {
    const { t } = useLocalI18n();
    return { t, h, PlusOutlined };
  },
});
</script>

<style scoped>
:deep(.ant-btn > span) {
  display: inline-flex;
}
</style>
