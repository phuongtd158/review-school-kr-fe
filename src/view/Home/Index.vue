<template>
  <section class="bg-white py-[10vh] flex flex-col md:flex-row items-center justify-between gap-8">
    <!-- Left content -->
    <div class="flex-1">
      <h2 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
        Xem và viết đánh giá.
        <br />
        Review <span class="text-blue-600 typing-text fade-in-text">{{ typingText }}</span>
      </h2>
      <p class="mt-4 text-gray-600 text-lg max-w-xl">
        <span class="font-semibold text-black">#1</span>
        Nền tảng đánh giá công ty, review công ty, doanh nghiệp. Hơn 15.000 công ty đã có mặt tại đây và được đánh giá
        bởi cộng đồng.
      </p>

      <div class="mt-4">
        <search-dropdown :input-addition-class="'!py-3 !pl-4 !pr-28'" :show-button-search="true" />
      </div>
    </div>

    <!-- Right illustration -->
    <div class="flex-1 relative">
      <img
        src="https://congtytui.me/assets/images/default/index-bg1.png?v=1.0.2.9"
        alt="Company Illustration"
        class="w-full max-w-md mx-auto relative right-0" />
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
import { defineComponent, onMounted, ref } from 'vue';
import { useLocalI18n } from '@/composables/use-i18n';
import { callApiTest } from '@/service/home';
import SearchDropdown from '@/components/SearchDropdown/Index.vue';
import SchoolTabs from '@/components/SchoolTab/Index.vue';
import NewestReviews from '@/components/NewestReviews/Index.vue';

export default defineComponent({
  components: { NewestReviews, SchoolTabs, SearchDropdown },
  setup() {
    const { t } = useLocalI18n();
    const typingText = ref('');
    const texts = ['trường học', 'giáo viên', 'học sinh'];
    let currentTextIndex = 0;

    const typeWriter = async () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const fullText = texts[currentTextIndex];
        // Gõ từng ký tự
        for (let i = 0; i <= fullText.length; i++) {
          typingText.value = fullText.slice(0, i);
          await new Promise(resolve => setTimeout(resolve, 100)); // tốc độ gõ
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // dừng lại 1s

        // Xóa từng ký tự
        for (let i = fullText.length; i >= 0; i--) {
          typingText.value = fullText.slice(0, i);
          await new Promise(resolve => setTimeout(resolve, 50)); // tốc độ xóa
        }

        // Chuyển sang text tiếp theo
        currentTextIndex = (currentTextIndex + 1) % texts.length;
      }
    };

    const testApi = async () => {
      try {
        const { body } = await callApiTest({ code: 'code', name: 'name' });
        console.log(body);
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(() => {
      typeWriter();
      testApi();
    });

    return { t, typingText };
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
