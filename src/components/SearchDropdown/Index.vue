<template>
  <div ref="searchWrapperRef" class="relative w-full max-w-md">
    <a-input
      ref="inputSearchRef"
      v-model:value="searchValue"
      class="hover:!border-gray-300 focus:!border-gray-300 !border-gray-300 !shadow-none"
      :placeholder="t('tim_kiem_truong_hoc')"
      :class="classInput"
      :size="'large'"
      @click="onShowDropdown"
      @input="debouncedSearch"
      @keydown.enter="onViewAll">
      <template #suffix>
        <button
          v-if="showButtonSearch"
          class="absolute right-1 top-1 bottom-1 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full text-sm font-semibold transition"
          @click="onViewAll">
          {{ t('tim_kiem') }}
        </button>
        <a-tooltip v-else :title="t('tim_kiem')">
          <search-outlined @click="onViewAll" class="cursor-pointer hover:text-blue-600" />
        </a-tooltip>
      </template>
    </a-input>

    <div
      v-if="showDropdown && searchValue.trim()"
      class="absolute left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-2xl shadow-lg z-50 dropdown-seamless max-h-96 flex flex-col">
      <!-- Loading state -->
      <template v-if="isLoading">
        <div class="flex items-center justify-center p-6">
          <a-spin />
        </div>
      </template>

      <template v-else-if="results.length">
        <div class="max-h-72 overflow-y-auto custom-scrollbar">
          <div
            v-for="item in results"
            :key="item.id"
            class="flex items-center justify-between gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
            @click="onSelect(item)">
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <img :src="item.logo" alt="logo" class="w-6 h-6 object-contain rounded-sm flex-shrink-0" />
              <div class="min-w-0 flex-1">
                <p v-tooltip class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ item.category }} • {{ item.reviews }} reviews</p>
              </div>
            </div>
            <div class="text-yellow-500 font-bold text-sm flex-shrink-0">★ {{ item.rating }}</div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col items-center justify-center text-center p-6">
          <div class="text-center">
            <img src="../../assets/images/empty-data.png" alt="empty data" width="200" height="150" />
          </div>
          <div class="text-sm leading-relaxed mt-3">
            <b>{{ t('khong_tim_thay_truong_hoc') }}</b>
            <div>{{ t('yeu_cau_them_truong_hoc_text') }} <span>👇</span></div>
          </div>
        </div>
      </template>

      <div
        v-if="!isLoading"
        class="text-center rounded-b-2xl py-3 border-t border-t-gray-300 hover:bg-gray-100 cursor-pointer text-sm font-medium flex-shrink-0 bg-white"
        @click="onViewAll">
        {{ results.length ? 'Xem tất cả kết quả →' : 'Yêu cầu thêm trường học +' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue';
import { ref, watch } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useLocalI18n } from '@/composables/use-i18n';
import { debounce } from 'lodash';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SearchDropdown',
  props: {
    inputAdditionClass: {
      type: String,
      required: false,
    },
    showButtonSearch: {
      type: Boolean,
      default: () => false,
    },
  },
  components: { SearchOutlined },
  setup(props) {
    const { t } = useLocalI18n();
    const router = useRouter();

    const searchValue = ref('');
    const results = ref<any[]>([]);
    const showDropdown = ref(false);
    const isLoading = ref(false);
    const searchWrapperRef = ref<HTMLElement | null>(null);
    const inputSearchRef = ref<HTMLElement | null>(null);

    const mockAPI = async (q: string) => {
      if (!q) return [];
      await new Promise(r => setTimeout(r, 300)); // giả lập delay
      // Tạo nhiều kết quả hơn để test scroll
      const baseResults = [
        {
          id: '1',
          name: 'Seoul National University',
          code: 'seoul-national-university',
          category: 'Quốc gia',
          reviews: 980,
          rating: 4.8,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '2',
          name: 'Korea Advanced Institute of Science and Technology (KAIST)',
          code: 'kaist',
          category: 'Công nghệ',
          reviews: 870,
          rating: 4.7,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '3',
          name: 'Yonsei University',
          code: 'yonsei-university',
          category: 'Tư thục',
          reviews: 760,
          rating: 4.5,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '4',
          name: 'Korea University',
          code: 'korea-university',
          category: 'Tư thục',
          reviews: 730,
          rating: 4.4,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '5',
          name: 'POSTECH (Pohang University of Science and Technology)',
          code: 'postech',
          category: 'Công nghệ',
          reviews: 610,
          rating: 4.6,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '6',
          name: 'Hanyang University',
          code: 'hanyang-university',
          category: 'Tư thục',
          reviews: 580,
          rating: 4.3,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '7',
          name: 'Sungkyunkwan University (SKKU)',
          code: 'sungkyunkwan-university',
          category: 'Tư thục',
          reviews: 540,
          rating: 4.2,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '8',
          name: 'Ewha Womans University',
          code: 'ewha-womans-university',
          category: 'Nữ sinh',
          reviews: 490,
          rating: 4.1,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '9',
          name: 'Kyung Hee University',
          code: 'kyung-hee-university',
          category: 'Tư thục',
          reviews: 460,
          rating: 4,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
        {
          id: '10',
          name: 'Chung-Ang University',
          code: 'chung-ang-university',
          category: 'Tư thục',
          reviews: 420,
          rating: 3.9,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png',
        },
      ];
      return baseResults.filter(
        item =>
          item.name.toLowerCase().includes(q.toLowerCase()) || item.category.toLowerCase().includes(q.toLowerCase())
      );
    };

    const performSearch = async (query: string) => {
      if (!query.trim()) {
        results.value = [];
        isLoading.value = false;
        return;
      }

      isLoading.value = true;
      try {
        const searchResults = await mockAPI(query);
        // Chỉ cập nhật results nếu query vẫn còn giống với searchValue hiện tại
        if (query === searchValue.value) {
          results.value = searchResults;
        }
      } catch (error) {
        console.error('Search error:', error);
        results.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    const debouncedSearch = debounce(() => {
      const query = searchValue.value?.trim();

      if (!query) {
        showDropdown.value = false;
        results.value = [];
        isLoading.value = false;
        return;
      }

      showDropdown.value = true;
      performSearch(query);
    }, 300);

    const onShowDropdown = () => {
      if (searchValue.value?.trim()) {
        showDropdown.value = true;
        // Nếu chưa có results thì search luôn
        if (results.value.length === 0 && !isLoading.value) {
          performSearch(searchValue.value);
        }
      }
    };

    const onSelect = (item: any) => {
      searchValue.value = '';
      showDropdown.value = false;
      router.push({ name: 'university-detail', params: { code: item.code } });
    };

    const onViewAll = () => {
      if (!searchValue.value.trim()) return;
      showDropdown.value = false;
      (inputSearchRef.value as HTMLElement)?.blur();
      router.push({ name: 'search', query: { q: searchValue.value } });
    };

    const onSelectFirstResult = () => {
      if (results.value.length > 0) {
        onSelect(results.value[0]);
      }
    };

    watch(searchValue, newVal => {
      if (!newVal?.trim()) {
        showDropdown.value = false;
        results.value = [];
        isLoading.value = false;
        debouncedSearch.cancel();
      }
    });

    const classInput = computed(() => {
      const defaultClass = 'hover:!border-gray-300 focus:!border-gray-300 !border-gray-300 !shadow-none';
      const roundedClass =
        showDropdown.value && searchValue.value?.trim() ? '!rounded-t-2xl !rounded-b-none' : '!rounded-4xl';
      return [defaultClass, roundedClass, props.inputAdditionClass || ''].join(' ').trim();
    });

    const handleClickOutside = (event: MouseEvent) => {
      const wrapper = searchWrapperRef.value as HTMLElement;
      if (wrapper && !wrapper.contains(event.target as Node)) {
        showDropdown.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
      debouncedSearch.cancel();
    });

    return {
      searchValue,
      classInput,
      results,
      showDropdown,
      isLoading,
      searchWrapperRef,
      inputSearchRef,
      t,
      onShowDropdown,
      debouncedSearch,
      onSelect,
      onViewAll,
      onSelectFirstResult,
    };
  },
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.custom-scrollbar {
  scroll-behavior: smooth;
}

.custom-scrollbar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
  pointer-events: none;
}
</style>
