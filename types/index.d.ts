import type { RouteRecordRedirectOption } from 'vue-router';

export type AnySafeType = any;
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouterMeta {
  title: string;
}

export interface Router {
  path: string;
  name: string;
  redirect?: string | RouteRecordRedirectOption;
  meta?: RouterMeta;
  component?: Component | (() => Promise<Component>) | string;
  children?: Router[];
}
