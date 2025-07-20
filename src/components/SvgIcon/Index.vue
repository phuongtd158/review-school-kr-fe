<template>
  <svg aria-hidden="true" :class="cls">
    <use :xlink:href="symbolId" />
    <title>{{ title }}</title>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
      default: () => {
        return '';
      },
    },
  },
  setup(props, context) {
    const defaultClass = ref('w-[16px] h-[16px]');
    const attrs = ref(context.attrs.class);
    const isDis = ref('');
    if (props.disabled) {
      isDis.value = 'disabled';
    } else {
      isDis.value = '';
    }
    let cls = (defaultClass.value += isDis.value);
    if (attrs.value) {
      attrs.value += cls;
    }
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId, cls };
  },
});
</script>
<style>
@media screen and (max-width: 1200px) {
  .icon {
    width: 16px;
    height: 16px;
  }
  .icon + span {
    font-size: unset;
  }
}
</style>
