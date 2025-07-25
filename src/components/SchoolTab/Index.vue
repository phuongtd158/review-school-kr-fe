<template>
  <div class="bg-white rounded-xl shadow p-4">
    <!-- Tabs -->
    <a-tabs
      v-model:activeKey="activeTabKey"
      class="custom-tabs"
      @change="onChangeTab"
      :size="isMobile ? 'small' : 'default'"
      :tab-position="'top'"
      :type="'line'"
      :more-icon="'...'"
      :hide-add="true">
      <a-tab-pane v-for="tab in tabs" :key="tab.key">
        <template #tab>
          <span class="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <span v-if="tab.icon" v-html="tab.icon" class="text-xs md:text-sm"></span>
            <span class="whitespace-nowrap">{{ tab.label }}</span>
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>

    <!-- Danh sách trường học -->
    <div v-if="loading" class="space-y-6">
      <skeleton-item v-for="i in pageSize" :key="i" />
    </div>
    <div v-else>
      <div
        v-for="school in pagedSchools"
        :key="school.id"
        class="flex items-start gap-4 p-4 transition-shadow bg-white border-b border-b-gray-200">
        <!-- Logo -->
        <img :src="school.logo" alt="logo" class="w-16 h-16 object-contain" />
        <!-- Nội dung -->
        <div class="flex-1 space-y-1">
          <!-- Tên trường -->
          <div class="text-lg font-semibold text-gray-900">{{ school.name }}</div>
          <!-- Đánh giá -->
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <span class="bg-green-100 text-green-600 font-medium px-2 py-0.5 rounded-full text-xs">5 ⭐</span>
            <span>{{ school.reviews }} đánh giá</span>
          </div>
          <!-- Loại & Quy mô -->
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>🏢 {{ school.type }}</span>
            <span>👥 {{ school.size }}</span>
          </div>
          <!-- Địa chỉ -->
          <div class="text-sm text-gray-400">📍 {{ school.address }}</div>
        </div>
      </div>
    </div>
    <!-- Phân trang -->
    <pagination :currentPage="page" :totalPages="totalPages" @update:page="goToPage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import Pagination from '@/components/Pagination/Index.vue';
import SkeletonItem from '@/components/SkeletonItem/Index.vue';

export default defineComponent({
  name: 'SchoolTabs',
  components: {
    SkeletonItem,
    Pagination,
  },
  setup() {
    const tabs = [
      { label: 'Mới cập nhật', key: 'latest', icon: '🔄' },
      { label: 'Nhiều drama', key: 'drama', icon: '🔥' },
      { label: 'Top trường học xịn', key: 'top', icon: '👍' },
      { label: 'Trường học nên tránh', key: 'avoid', icon: '👎' },
    ];

    const activeTabKey = ref('latest');
    const activeTab = ref(0);
    const loading = ref(false);
    const isMobile = ref(false);

    // Fake data
    const allSchools = [
      {
        id: 1,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Quốc gia TP.HCM',
        reviews: 12,
        type: 'Đại học',
        size: '20.000+',
        address: 'Linh Trung, Thủ Đức, TP.HCM',
      },
      {
        id: 2,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Bách Khoa TP.HCM',
        reviews: 8,
        type: 'Đại học',
        size: '15.000+',
        address: '268 Lý Thường Kiệt, Quận 10, TP.HCM',
      },
      {
        id: 3,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Khoa học Tự nhiên',
        reviews: 10,
        type: 'Đại học',
        size: '12.000+',
        address: '227 Nguyễn Văn Cừ, Quận 5, TP.HCM',
      },
      {
        id: 4,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Kinh tế - Luật',
        reviews: 7,
        type: 'Đại học',
        size: '8.000+',
        address: '669 QL1, Linh Xuân, Thủ Đức, TP.HCM',
      },
      {
        id: 5,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Khoa học Tự nhiên Hà Nội',
        reviews: 9,
        type: 'Đại học',
        size: '10.000+',
        address: '334 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      },
      {
        id: 6,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Bách Khoa Hà Nội',
        reviews: 15,
        type: 'Đại học',
        size: '18.000+',
        address: '1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
      },
      {
        id: 7,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Kinh tế Quốc dân',
        reviews: 11,
        type: 'Đại học',
        size: '17.000+',
        address: '207 Giải Phóng, Hai Bà Trưng, Hà Nội',
      },
      {
        id: 8,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Ngoại thương',
        reviews: 13,
        type: 'Đại học',
        size: '9.000+',
        address: '91 Chùa Láng, Đống Đa, Hà Nội',
      },
      {
        id: 9,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Y Dược TP.HCM',
        reviews: 6,
        type: 'Đại học',
        size: '7.000+',
        address: '217 Hồng Bàng, Quận 5, TP.HCM',
      },
      {
        id: 10,
        logo: 'https://congtytui.me/storage/images/companies/nodo-jsc.png',
        name: 'Đại học Sư phạm Hà Nội',
        reviews: 5,
        type: 'Đại học',
        size: '8.000+',
        address: '136 Xuân Thủy, Cầu Giấy, Hà Nội',
      },
    ];
    const schools = ref([...allSchools]); // Thay bằng fetch API thực tế

    // Pagination
    const page = ref(1);
    const pageSize = 10;
    const totalPages = computed(() => Math.ceil(schools.value.length / pageSize));
    const pagedSchools = computed(() => schools.value.slice((page.value - 1) * pageSize, page.value * pageSize));

    const goToPage = (p: number) => {
      if (p < 1 || p > totalPages.value) return;
      loading.value = true;
      page.value = p;
      setTimeout(() => {
        loading.value = false;
      }, 800);
    };

    const onChangeTab = (key: string) => {
      activeTabKey.value = key;
      loading.value = true;
      setTimeout(() => {
        // Giả lập fetch
        schools.value = [...allSchools]; // Lọc tùy tab.key nếu muốn
        page.value = 1;
        loading.value = false;
      }, 800);
    };

    const checkIsMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };

    onMounted(() => {
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkIsMobile);
    });

    return {
      tabs,
      activeTab,
      loading,
      schools,
      pagedSchools,
      page,
      totalPages,
      pageSize,
      goToPage,
      onChangeTab,
      activeTabKey,
      isMobile,
    };
  },
});
</script>
<style scoped>
.custom-tabs {
  /* Force hiển thị more button trên mobile */
  --ant-tabs-bar-margin: 0;
}

.custom-tabs :deep(.ant-tabs-nav) {
  margin-bottom: 16px;
}

.custom-tabs :deep(.ant-tabs-tab) {
  padding: 8px 12px;
  margin-right: 0;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .custom-tabs :deep(.ant-tabs-nav-wrap) {
    width: 100%;
  }
  .custom-tabs :deep(.ant-tabs-nav-list)::-webkit-scrollbar {
    display: none;
  }

  .custom-tabs :deep(.ant-tabs-tab) {
    padding: 6px 8px;
    font-size: 12px;
    flex-shrink: 0;
    min-width: auto;
  }

  .custom-tabs :deep(.ant-tabs-nav-operations) {
    /* Đảm bảo more button hiển thị */
    display: flex !important;
    flex-shrink: 0;
  }

  .custom-tabs :deep(.ant-tabs-nav-more) {
    /* Style cho more button */
    display: block !important;
    padding: 6px 8px;
    background: #f5f5f5;
    border-radius: 4px;
    margin-left: 4px;
  }
}

/* Force hiển thị operations khi cần */
.custom-tabs :deep(.ant-tabs-nav-operations) {
  opacity: 1 !important;
  pointer-events: auto !important;
}
</style>
