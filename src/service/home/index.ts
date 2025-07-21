import { get } from '@/service';
import API from '@/service/url';
import type { ExampleReq, ExampleRes } from '#/home';

export function callApiTest(params: ExampleReq) {
  return get<ExampleRes>(API.TEST_URL, params);
}
