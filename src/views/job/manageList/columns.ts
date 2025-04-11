import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { NText } from 'naive-ui';

export interface ListData {
  cid: number;
  detail: string;
  eduBackground: number;
  id: number;
  name: string;
  pubTime: string;
  salaryEnd: number;
  salaryStart: number;
  status: number;
  workAddress: string;
  workExperience: string;
}

export const columns: BasicColumn<ListData>[] = [
  {
    title: 'ID',
    key: 'id',
    width: 60,
  },
  {
    title: '职位名',
    key: 'name',
    width: 160,
  },
  {
    title: '工作地址',
    key: 'workAddress',
    width: 200,
  },
  {
    title: '工作经验',
    key: 'workExperience',
    width: 100,
  },
  {
    title: '学历要求',
    key: 'eduBackground',
    width: 100,
  },
  {
    title: '详细',
    key: 'detail',
    width: 180,
  },
  {
    title: '发布时间',
    key: 'pubTime',
    width: 180,
    render: (record) => {
      return h(
        NText,
        {
          type: 'text',
        },
        record.pubTime.split('T')[0]
      );
    },
  },
  {
    title: '最低薪资',
    key: 'salaryStart',
    width: 100,
  },
  {
    title: '最高薪资',
    key: 'salaryEnd',
    width: 100,
  },
  // {
  //   title: '状态',
  //   key: 'status',
  //   render(record) {
  //     return h(
  //       NTag,
  //       {
  //         type:
  //           record.status === 'close'
  //             ? 'default'
  //             : record.status === 'refuse'
  //             ? 'error'
  //             : 'success',
  //       },
  //       {
  //         default: () => statusMap[record.status],
  //       }
  //     );
  //   },
  // },
  // {
  //   title: '创建时间',
  //   key: 'createDate',
  // },
];
