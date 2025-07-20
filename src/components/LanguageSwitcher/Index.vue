<template>
  <a-dropdown>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="lang in localeOptions" :key="lang.label">
          <div class="flex items-center gap-1" @click="handleLocaleChange(lang.value)">
            <div>
              <svg-icon :name="getLocaleIcon(lang.value)" />
            </div>
            <div>{{ lang.label }}</div>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
    <a-button>
      <div class="flex items-center gap-1">
        <div><svg-icon :name="getLocaleIcon(currentLocale)" /></div>
        <div>{{ currentLocaleName }}</div>
        <down-outlined />
      </div>
    </a-button>
  </a-dropdown>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useI18n } from '@/composables/use-i18n';
import { DownOutlined } from '@ant-design/icons-vue';
import type { SupportedLocale } from '@/i18n/index';

export default defineComponent({
  name: 'LanguageSwitcher',
  components: { DownOutlined },
  setup() {
    const icon = ref<any>({
      en: 'en',
      vi: 'vi',
      kr: 'kr',
    });
    const { locale, changeLocale, localeOptions } = useI18n();
    const currentLocale = ref<SupportedLocale>(locale.value);

    const handleLocaleChange = (locale: SupportedLocale) => {
      currentLocale.value = locale;
      changeLocale(currentLocale.value);
    };

    const getLocaleIcon = (locale: SupportedLocale) => icon.value[locale];

    const currentLocaleName = computed(
      () => localeOptions.value.find(item => item.value === currentLocale.value)?.value
    );

    watch(locale, newLocale => {
      currentLocale.value = newLocale;
    });

    return { currentLocale, localeOptions, currentLocaleName, handleLocaleChange, getLocaleIcon };
  },
});
</script>
<style scoped></style>
