<template>
  <a-layout-footer class="!bg-white border-t border-gray-200 text-center py-6 mt-12">
    <!-- Link trên -->
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-blue-600 mb-6">
      <a href="#">Yêu cầu thêm công ty</a>
      <a href="#">Feedback</a>
      <a href="#">FAQ</a>
      <a href="#">Điều khoản sử dụng</a>
      <a href="#">Liên hệ</a>
    </div>
    <!-- Từ khóa -->
    <div class="flex flex-wrap justify-center items-center gap-2 text-sm">
      <span class="font-semibold text-gray-800 mr-2">Từ khóa:</span>
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
