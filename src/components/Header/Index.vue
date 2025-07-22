<template>
  <a-layout-header class="fixed top-0 left-0 w-full z-50 !bg-white shadow-sm">
    <div class="max-w-screen-xl mx-auto px-4">
      <!-- Desktop Layout (md and up) -->
      <div class="hidden md:flex items-center justify-between gap-4 py-4">
        <div class="flex items-center gap-2 cursor-pointer" @click="navigateToHome">
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

      <!-- Mobile Layout (below md) -->
      <div class="md:hidden py-3">
        <!-- Top Row: Logo, Button, Language Switcher -->
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2 min-w-0 cursor-pointer" @click="navigateToHome">
            <svg-icon name="vite" class="flex-shrink-0" />
            <span class="text-lg font-semibold text-gray-800 truncate">REVIEW UNIVERSITY</span>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <a-button
              type="primary"
              shape="round"
              size="small"
              class="bg-blue-600 hover:bg-blue-700 border-none text-white"
              :icon="h(PlusOutlined)">
              {{ t('yeu_cau_them_truong_hoc') }}
            </a-button>
            <language-switcher />
          </div>
        </div>

        <!-- Bottom Row: Search Input -->
        <div class="w-full flex justify-center">
          <search-dropdown />
        </div>
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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppHeader',
  components: { SearchDropdown, LanguageSwitcher, PlusOutlined },
  setup() {
    const { t } = useLocalI18n();
    const router = useRouter();

    const navigateToHome = () => {
      router.push({ path: '/' });
    };

    return { t, h, navigateToHome, PlusOutlined };
  },
});
</script>

<style scoped>
:deep(.ant-btn > span) {
  display: inline-flex;
}
</style>
