import { Alova } from '@/utils/http/alova/index';

export function getEmployeeList(params) {
  return Alova.Get<InResult>('/employee/list', { params });
}
