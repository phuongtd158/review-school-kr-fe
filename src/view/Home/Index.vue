<template>
  <section class="bg-white py-[4vh] relative min-h-[30vh] md:min-h-auto">
    <!-- Right illustration - background trên mobile -->
    <div class="absolute inset-0 md:relative md:hidden flex items-center justify-center z-0">
      <img src="../../assets/images/banner-v2.png" alt="Company Illustration" class="w-full max-w-md opacity-10" />
    </div>

    <!-- Container với relative positioning -->
    <div
      class="relative z-10 md:z-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 px-4 md:px-0">
      <!-- Left content - overlay trên mobile -->
      <div class="flex-1 relative">
        <h2 class="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-0">
          Xem và viết đánh giá.
          <br />
          Review <span class="text-blue-600 typing-text fade-in-text">{{ typingText }}</span>
        </h2>
        <p class="mt-2 md:mt-4 text-gray-600 text-base md:text-lg max-w-xl">
          <span class="font-semibold text-black">#1</span>
          Nền tảng đánh giá công ty, review công ty, doanh nghiệp. Hơn 15.000 công ty đã có mặt tại đây và được đánh giá
          bởi cộng đồng.
        </p>
        <div class="mt-3 md:mt-4">
          <search-dropdown :input-addition-class="'!py-3 !pl-4 !pr-28'" :show-button-search="true" />
        </div>
        <div class="mt-3 md:mt-4">
          <recently-viewed />
        </div>
      </div>

      <!-- Right illustration - chỉ hiển thị trên desktop -->
      <div class="flex-1 relative hidden md:block">
        <img
          src="../../assets/images/banner-v2.png"
          alt="Company Illustration"
          class="w-full max-w-md mx-auto relative right-0" />
      </div>
    </div>
  </section>

  <div class="mt-4 flex flex-col md:flex-row gap-6">
    <div class="flex-1">
      <school-tabs />
    </div>
    <div class="w-full md:w-[350px] flex-shrink-0">
      <newest-reviews />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useLocalI18n } from '@/composables/use-i18n';
import { callApiTest } from '@/service/home';
import SearchDropdown from '@/components/SearchDropdown/Index.vue';
import SchoolTabs from '@/components/SchoolTab/Index.vue';
import NewestReviews from '@/components/NewestReviews/Index.vue';
import RecentlyViewed from '@/components/RecentlyViewed/Index.vue';

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 1000;
const RESTART_DELAY = 100;

export default defineComponent({
  components: { RecentlyViewed, NewestReviews, SchoolTabs, SearchDropdown },
  setup() {
    const { t, locale } = useLocalI18n();
    const typingText = ref('');
    const texts = ref<string[]>([]);
    const currentTextIndex = ref(0);

    let abortController: AbortController | null = null;

    const TEXT_KEYS = ['truong_hoc', 'giang_vien', 'sinh_vien'];

    const updateTexts = (): void => {
      texts.value = TEXT_KEYS.map(key => t(key));
    };

    const delay = (ms: number, signal?: AbortSignal): Promise<void> => {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(resolve, ms);
        signal?.addEventListener('abort', () => {
          clearTimeout(timeoutId);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    };

    const typeWriter = async (): Promise<void> => {
      if (abortController) {
        abortController.abort();
      }

      abortController = new AbortController();
      const { signal } = abortController;

      try {
        while (!signal.aborted) {
          const fullText = texts.value[currentTextIndex.value] || '';

          // Gõ từng ký tự
          for (let i = 0; i <= fullText.length; i++) {
            if (signal.aborted) return;
            typingText.value = fullText.slice(0, i);
            await delay(TYPING_SPEED, signal);
          }

          // Dừng
          await delay(PAUSE_DURATION, signal);

          // Xóa từng ký tự
          for (let i = fullText.length; i >= 0; i--) {
            if (signal.aborted) return;
            typingText.value = fullText.slice(0, i);
            await delay(ERASING_SPEED, signal);
          }

          // Sang chuỗi tiếp theo
          currentTextIndex.value = (currentTextIndex.value + 1) % texts.value.length;
        }
      } catch (error) {
        // Handle abort gracefully
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('Typewriter animation error:', error);
      }
    };

    // Debounced locale watcher
    let localeTimeout: NodeJS.Timeout;
    watch(locale, () => {
      clearTimeout(localeTimeout);
      localeTimeout = setTimeout(() => {
        updateTexts();
        currentTextIndex.value = 0;
        typeWriter();
      }, RESTART_DELAY);
    });

    onMounted(async () => {
      updateTexts();
      typeWriter();

      // Call API without blocking UI
      await callApiTest({ code: 'code', name: 'name' });
    });

    onUnmounted(() => {
      // Cleanup
      if (abortController) {
        abortController.abort();
      }
      clearTimeout(localeTimeout);
    });

    return {
      t,
      typingText,
    };
  },
});
</script>
<style scoped>
.typing-text::after {
  content: '|';
  animation: blink 1s step-start infinite;
  margin-left: 2px;
  color: #2563eb; /* màu xanh giống text-blue-600 */
}
.fade-in-text {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
