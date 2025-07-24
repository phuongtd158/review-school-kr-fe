<template>
  <div class="flex gap-4 py-4 animate-pulse border-b border-gray-200">
    <!-- Logo -->
    <div class="w-16 h-16 bg-gray-200 rounded object-contain"></div>

    <!-- Nội dung -->
    <div class="flex-1 space-y-2">
      <!-- Tên trường -->
      <div class="h-5 bg-gray-200 rounded w-1/3"></div>

      <!-- Đánh giá -->
      <div class="flex gap-2">
        <div class="h-4 bg-gray-100 rounded w-12"></div>
        <div class="h-4 bg-gray-100 rounded w-16"></div>
      </div>

      <!-- Loại và quy mô -->
      <div class="flex gap-4">
        <div class="h-4 bg-gray-100 rounded w-24"></div>
        <div class="h-4 bg-gray-100 rounded w-20"></div>
      </div>

      <!-- Địa chỉ -->
      <div class="h-4 bg-gray-100 rounded w-1/2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SkeletonItem',
});
</script>
