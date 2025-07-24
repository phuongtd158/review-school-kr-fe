<template>
  <div class="flex items-center justify-center gap-2 mt-6">
    <!-- Prev -->
    <a-button
      shape="circle"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
      aria-label="Previous Page">
      &lt;
    </a-button>

    <!-- Pages -->
    <template v-for="item in pagesToShow" :key="item">
      <a-button
        v-if="item !== '...'"
        shape="circle"
        :class="item === currentPage ? '!bg-blue-500 !text-white' : ''"
        @click="() => item !== currentPage && $emit('update:page', item)"
        :aria-current="item === currentPage ? 'page' : undefined">
        {{ item }}
      </a-button>
      <span v-else class="w-10 h-10 flex items-center justify-center text-lg text-gray-400 select-none">...</span>
    </template>

    <!-- Next -->
    <a-button
      shape="circle"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
      aria-label="Next Page">
      &gt;
    </a-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const pagesToShow = computed(() => {
      const { currentPage, totalPages } = props;
      const pages: (number | string)[] = [];

      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const addPages = (arr: (number | string)[]) => pages.push(...arr);

      if (currentPage <= 4) {
        addPages([1, 2, 3, 4, 5, '...', totalPages]);
      } else if (currentPage >= totalPages - 3) {
        addPages([1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
      } else {
        addPages([1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]);
      }

      return pages;
    });

    return { pagesToShow };
  },
});
</script>
