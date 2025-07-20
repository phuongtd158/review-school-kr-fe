<template>
  <a-layout-header class="fixed top-0 left-0 w-full z-50 bg-white shadow-sm" style="background: white">
    <div class="max-w-screen-xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4 px-4 py-3">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <!--        <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-auto object-contain" />-->
        <svg-icon name="vite" />
        <span class="text-xl font-semibold text-gray-800 whitespace-nowrap">VITE</span>
      </div>

      <!-- Search (chiếm chiều rộng lớn trên mobile) -->
      <a-input-search
        v-model:value="searchValue"
        placeholder="Tìm kiếm công ty..."
        class="flex-1 min-w-[200px] max-w-md"
        @search="onSearch" />

      <!-- Actions: Button + Lang -->
      <div class="flex items-center gap-2">
        <a-button
          type="primary"
          shape="round"
          class="bg-blue-600 hover:bg-blue-700 border-none text-white whitespace-nowrap">
          Yêu cầu thêm công ty +
        </a-button>
        <language-switcher />
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LanguageSwitcher from '@/components/LanguageSwitcher/Index.vue';

export default defineComponent({
  name: 'AppHeader',
  components: { LanguageSwitcher },
  setup() {
    const searchValue = ref('');
    const onSearch = (value: string) => {
      console.log('Search:', value);
    };
    return { searchValue, onSearch };
  },
});
</script>

<style scoped></style>
