<template>
  <a-button
    v-if="isVisible"
    type="primary"
    shape="circle"
    @click="scrollToTop"
    class="!fixed !bottom-6 !right-6 !z-50 !shadow-lg !flex items-center justify-center text-lg"
    aria-label="Scroll to top">
    <template #icon>
      <arrow-up-outlined />
    </template>
  </a-button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { ArrowUpOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'ScrollToTop',
  components: {
    ArrowUpOutlined,
  },
  setup() {
    const isVisible = ref(false);

    const handleScroll = () => {
      isVisible.value = window.scrollY > 300;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { isVisible, scrollToTop };
  },
});
</script>

<style scoped></style>
