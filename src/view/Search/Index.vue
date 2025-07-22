<template>
  <div>{{ query }}</div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Search',
  setup() {
    const route = useRoute();
    const query = computed(() => route.query?.q);
    return {
      query,
    };
  },
});
</script>
<style scoped></style>
