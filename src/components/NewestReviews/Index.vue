<template>
  <div class="bg-white rounded-xl shadow p-4 w-full md:w-[350px]">
    <div class="font-semibold text-lg mb-4 flex items-center gap-2">
      <span>📝</span>
      Các Review Mới Nhất
    </div>
    <div
      v-for="review in reviews"
      :key="review.id"
      class="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
      <div class="text-sm text-gray-500 mb-1">
        <span class="font-semibold">Ẩn danh</span>
        đã review
        <a :href="review.companyUrl" class="text-blue-600 font-semibold hover:underline" target="_blank">{{
          review.company
        }}</a>
      </div>
      <div class="flex items-center gap-2 mb-1">
        <div class="flex gap-0.5">
          <span v-for="i in 5" :key="i" class="text-xs" :class="i <= review.stars ? 'text-green-500' : 'text-gray-300'"
            >★</span
          >
        </div>
        <span class="text-xs text-gray-400">{{ review.time }}</span>
      </div>
      <div class="text-sm text-gray-700 line-clamp-2">
        {{ review.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'NewestReviews',
  setup() {
    const reviews = [
      {
        id: 1,
        company: 'GMO-Z.com RUNSYSTEM',
        companyUrl: '#',
        stars: 5,
        time: '3 phút trước',
        content: 'Dạo này có thể chậm chuyển gì không máy ơi, chờ hoài cái call',
      },
      {
        id: 2,
        company: 'AGEST Vietnam',
        companyUrl: '#',
        stars: 2,
        time: '14 phút trước',
        content:
          'Công ty có rất ít người có thể technical tốt, còn người làm non lắm, vẫn chỉ duy nhất 1 toai Test Architect giỏi, đám toai này dở chả biết tí tool này.',
      },
      {
        id: 3,
        company: 'Công ty Cổ phần VTI',
        companyUrl: '#',
        stars: 3,
        time: '15 phút trước',
        content: 'Làm dự án xong ai còn mãi mà không thấy thưởng dị anh vợi!',
      },
      {
        id: 4,
        company: 'BTaskee',
        companyUrl: '#',
        stars: 1,
        time: '18 phút trước',
        content:
          'Chấm mấy bồ nhân viên cũ là Laser thì sao không tự lập luôn thành công ty đi? Laser sao bằng bồ cũ công ty này đâu mà nói tốt, lạ ghê, có group thì tốt mà chê chat xong báo cáo.',
      },
      {
        id: 5,
        company: 'DPT Solution Company Limited',
        companyUrl: '#',
        stars: 4,
        time: '20 phút trước',
        content: 'Tháng sẽ việc Trung bắc lẻ Intern để bác lại sẽ gặp chị thay ngay',
      },
      {
        id: 6,
        company: 'NashTech',
        companyUrl: '#',
        stars: 2,
        time: '26 phút trước',
        content:
          'Nhấn mạnh là quá nhiều, nên training là đưa nhận order thì lắng nghe thôi thì tuyệt. Chứ nhiều lần order phải chờ deal từng đồng cho công nợ không thích, đẩy áp lực bằng cách chuyển thật nhiều intern vào...',
      },
    ];
    return { reviews };
  },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
