<template>
  <div class="flex items-center justify-center gap-2 mt-6">
    <button
      class="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gray-100 text-gray-400 hover:bg-gray-200 transition"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)">
      &lt;
    </button>
    <template v-for="item in pagesToShow" :key="item">
      <button
        v-if="item !== '...'"
        class="w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold transition"
        :class="item === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="$emit('update:page', item)">
        {{ item }}
      </button>
      <span v-else class="w-10 h-10 flex items-center justify-center text-lg text-gray-400">...</span>
    </template>
    <button
      class="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gray-100 text-gray-400 hover:bg-gray-200 transition"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)">
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

// Logic hiển thị các trang, dấu ...
const pagesToShow = computed(() => {
  const pages: (number | string)[] = [];
  if (props.totalPages <= 7) {
    for (let i = 1; i <= props.totalPages; i++) pages.push(i);
  } else {
    if (props.currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', props.totalPages);
    } else if (props.currentPage >= props.totalPages - 3) {
      pages.push(
        1,
        '...',
        props.totalPages - 4,
        props.totalPages - 3,
        props.totalPages - 2,
        props.totalPages - 1,
        props.totalPages
      );
    } else {
      pages.push(1, '...', props.currentPage - 1, props.currentPage, props.currentPage + 1, '...', props.totalPages);
    }
  }
  return pages;
});
</script>
