<template>
  <template v-if="schools.length">
    <div class="text-sm text-gray-500 font-medium flex items-center gap-2 mb-2">
      <ClockCircleOutlined class="text-gray-400" />
      <span>{{ t('da_xem_gan_day') }}</span>
    </div>
    <div class="flex flex-wrap gap-2">
      <a-tag
        v-for="(school, index) in schools"
        :key="index"
        color="default"
        class="cursor-pointer hover:bg-blue-50"
        @click="navigateToDetail(school)">
        {{ school.name }}
      </a-tag>
    </div>
  </template>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalI18n } from '@/composables/use-i18n';
import { ClockCircleOutlined } from '@ant-design/icons-vue';
import { storage } from '@/utils/storage';
import type { AnySafeType } from '#/index';

export default defineComponent({
  name: 'RecentlyViewed',
  components: { ClockCircleOutlined },
  setup() {
    const { t } = useLocalI18n();
    const router = useRouter();
    const schools = ref<AnySafeType[]>([]);

    onMounted(() => {
      const stored = storage.get('recentViewed', []);
      if (stored) {
        schools.value = stored;
      }
    });

    const navigateToDetail = (school: AnySafeType) => {
      router.push({ name: 'university-detail', params: { code: school.code } });
    };

    return { schools, t, navigateToDetail };
  },
});
</script>

<style scoped></style>
