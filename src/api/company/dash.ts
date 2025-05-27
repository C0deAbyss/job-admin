import { Alova } from '@/utils/http/alova/index';

export interface CompanyInfo {
  address: string;
  buildTime: string;
  description: string;
  id: number;
  industry: string;
  legalRepresentative: string;
  name: string;
  register: number;
  rest: string;
  scale: number;
  status: number;
  workEnd: number;
  workOvertime: string;
  workStart: number;
}

export function getCompanyInfo() {
  return Alova.Get<CompanyInfo>('/company/userCompany');
}

export function createCompany(data: CompanyInfo) {
  return Alova.Post<InResult>('/company/publish', data, {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}
