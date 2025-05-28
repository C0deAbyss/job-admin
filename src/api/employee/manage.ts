import { Alova } from '@/utils/http/alova';

export interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  age: number;
  nickname: string;
  phone: string;
  email: string;
  status: number;
  eduBackground: string;
  advantage: string;
  skill: string;
  role: number;
  gender: number;
}

export function getEmployeeList(params: any) {
  return Alova.Get<InResult>('/employee/list', { params });
}

export function infoEmployee(id: number) {
  return Alova.Get<User>(`/employee/info?id=${id}`);
}

export function addEmployee(data: User) {
  return Alova.Post<InResult>('/employee/add', data, {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

export function updateEmployee(data: User) {
  return Alova.Post<InResult>('/employee/update', data, {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

export function deleteEmployee(id: number) {
  return Alova.Get<InResult>(`/employee/delete?id=${id}`, {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}
