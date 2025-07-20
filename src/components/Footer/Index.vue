<template>
  <a-layout-footer class="bg-gray-50 border-t border-gray-200 text-center py-6">
    <!-- Link trên -->
    <div class="space-x-4 text-sm text-blue-600 font-medium mb-4">
      <a href="#">Yêu cầu thêm công ty</a>
      <a href="#">Feedback</a>
      <a href="#">FAQ</a>
      <a href="#">Điều khoản sử dụng</a>
      <a href="#">Liên hệ</a>
    </div>
    <!-- Từ khóa -->
    <div class="flex flex-wrap justify-center items-center gap-2 text-sm">
      <span class="font-semibold text-gray-800">Từ khóa:</span>
      <a-button size="small">Review Công Ty</a-button>
      <a-button size="small">Đánh Giá Công Ty</a-button>
      <a-button size="small">Đánh Giá Nơi Làm Việc</a-button>
      <a-button size="small">Công Ty Uy Tín</a-button>
      <a-button size="small">Tra Cứu Công Ty</a-button>
      <a-button size="small">Thông Tin Công Ty</a-button>
    </div>
  </a-layout-footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
