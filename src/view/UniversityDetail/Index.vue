<template>
  <div>{{ universityCode }}</div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UniversityDetail',
  setup() {
    const route = useRoute();
    const universityCode = computed(() => route.params?.code);

    watch(
      () => universityCode.value,
      () => {
        // TODO: sau lấy tên lên title
        document.title = `${document.title} - ${universityCode.value}`;
      }
    );

    onMounted(() => {});

    return {
      universityCode,
    };
  },
});
</script>
<style scoped></style>
