<template>
  <a-layout-header
    :class="[
      'fixed top-0 left-0 w-full z-50 !bg-white shadow-sm transition-all duration-300 ease-out',
      scrollY >= 100 ? 'header-bounce' : '',
    ]">
    <div class="max-w-screen-xl mx-auto px-4">
      <!-- Desktop Layout-->
      <div class="hidden md:flex items-center justify-between gap-4 py-4">
        <div class="flex items-center gap-2 cursor-pointer" @click="navigateToHome">
          <svg-icon name="vite" />
          <span class="text-xl font-semibold text-gray-800 whitespace-nowrap">REVIEW UNIVERSITY</span>
        </div>
        <search-dropdown v-if="scrollY >= 100" />
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
      <!-- Desktop Layout-->

      <!-- Mobile Layout -->
      <div class="md:hidden py-3">
        <!-- Logo, Button, Language Switcher -->
        <div v-if="scrollY < 100" class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2 min-w-0 cursor-pointer" @click="navigateToHome">
            <svg-icon name="vite" class="flex-shrink-0" />
            <span class="text-lg font-semibold text-gray-800 truncate">REVIEW UNIVERSITY</span>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <a-button
              type="primary"
              shape="round"
              size="middle"
              class="bg-blue-600 hover:bg-blue-700 border-none text-white"
              :icon="h(PlusOutlined)">
              {{ t('yeu_cau_them_truong_hoc') }}
            </a-button>
            <language-switcher />
          </div>
        </div>
        <!-- Logo, Button, Language Switcher -->

        <!-- Search Input -->
        <div class="w-full flex justify-center gap-5">
          <div
            v-if="scrollY >= 100"
            class="md:hidden flex items-center gap-2 min-w-0 cursor-pointer"
            @click="navigateToHome">
            <svg-icon name="vite" class="flex-shrink-0" />
          </div>
          <search-dropdown />
          <div v-if="scrollY >= 100" class="flex items-center gap-2 flex-shrink-0">
            <language-switcher />
          </div>
        </div>
        <!-- Search Input -->
      </div>
      <!-- Mobile Layout -->
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
    const scrollY = ref(window.scrollY);

    const navigateToHome = () => {
      router.push({ path: '/' });
    };

    const isScrolledEnough = computed(() => scrollY.value >= 100);
    const hasScrolledOnce = ref(false);

    const handleScroll = () => {
      scrollY.value = window.scrollY;
      if (scrollY.value >= 100) {
        hasScrolledOnce.value = true;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { scrollY, isScrolledEnough, hasScrolledOnce, t, h, navigateToHome, PlusOutlined };
  },
});
</script>

<style scoped>
:deep(.ant-btn > span) {
  display: inline-flex;
}
.header-bounce {
  animation: headerSlide 0.35s ease-out;
}

@keyframes headerSlide {
  0% {
    transform: translateY(-12px);
    opacity: 0.9;
  }
  70% {
    transform: translateY(2px);
    opacity: 0.95;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
