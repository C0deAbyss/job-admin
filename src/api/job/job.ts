import { Alova } from '@/utils/http/alova/index';

export interface Job {
  id: number;
  name: string;
  workAddress: string;
  workExperience: string;
  eduBackground: string;
  detail: string;
  pubTime: Date;
  cid: number;
  salaryStart: number;
  salaryEnd: number;
  status: number;
}

export function getJobList(params: any) {
  return Alova.Get<InResult>('/job/list', { params });
}

export function getJobInfo(id: number) {
  return Alova.Get<InResult<Job>>(`/job/info?id=${id}`);
}

export function saveJob(data: Job) {
  return Alova.Post<InResult>(
    '/job/save',
    { ...data },
    {
      meta: {
        isReturnNativeResponse: true,
      },
    }
  );
}
