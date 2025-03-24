import { h } from 'vue';
import { NAvatar, NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export interface ListData {
  id: number;
  name: string;
  gender: number;
  avatar: string;
  email: string;
  eduBackground: string;
  role: number;
  phone: string;
}

const sexMap = ['女', '男', '未知'];

export const columns: BasicColumn<ListData>[] = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    key: 'nickname',
  },
  {
    title: '头像',
    key: 'avatar',
    render(record) {
      return h(NAvatar, {
        size: 50,
        src: record.avatar,
      });
    },
  },
  {
    title: '性别',
    key: 'gender',
    render(record) {
      return h(
        NTag,
        {
          type: record.gender === 0 ? 'info' : 'error',
        },
        {
          default: () => sexMap[record.gender],
        }
      );
    },
  },
  {
    title: '邮箱',
    key: 'email',
    width: 220,
  },
  {
    title: '手机号',
    key: 'phone',
    width: 220,
  },
  {
    title: '教育背景',
    key: 'eduBackground',
    width: 180,
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
