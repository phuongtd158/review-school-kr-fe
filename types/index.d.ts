import type { defineComponent } from 'vue';

export type AnySafeType = any;

export type Component<T = AnySafeType> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);
