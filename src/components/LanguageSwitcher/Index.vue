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
    <div class="flex items-center gap-1 cursor-pointer w-14">
      <div><svg-icon :name="getLocaleIcon(currentLocale)" /></div>
      <div>{{ currentLocaleCode }}</div>
      <down-outlined />
    </div>
  </a-dropdown>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useLocalI18n } from '@/composables/use-i18n';
import { DownOutlined } from '@ant-design/icons-vue';
import type { SupportedLocale } from '@/i18n';

export default defineComponent({
  name: 'LanguageSwitcher',
  components: { DownOutlined },
  setup() {
    const icon = ref<any>({
      en: 'en_rounded',
      vi: 'vi_rounded',
      kr: 'kr_rounded',
    });
    const { locale, changeLocale, localeOptions } = useLocalI18n();
    const currentLocale = ref<SupportedLocale>(locale.value);

    const handleLocaleChange = (locale: SupportedLocale) => {
      currentLocale.value = locale;
      changeLocale(currentLocale.value);
    };

    const getLocaleIcon = (locale: SupportedLocale) => icon.value[locale];

    const currentLocaleCode = computed(() =>
      localeOptions.value.find(item => item.value === currentLocale.value)?.value.toLocaleUpperCase()
    );

    watch(locale, newLocale => {
      currentLocale.value = newLocale;
    });

    return { currentLocale, localeOptions, currentLocaleCode, handleLocaleChange, getLocaleIcon };
  },
});
</script>
<style scoped></style>
