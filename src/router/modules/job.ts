import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { GoldOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';

const routeName = 'job';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/job',
    name: routeName,
    redirect: '/job/console',
    component: Layout,
    meta: {
      title: 'job',
      icon: renderIcon(GoldOutlined),
      permissions: ['job_manage', 'job_manage'],
      sort: 0,
    },
    children: [
      {
        path: 'manage',
        name: `${routeName}_manage`,
        meta: {
          title: '职位管理',
          permissions: ['job_manage'],
          affix: true,
        },
        component: () => import('@/views/job/manageList/index.vue'),
      },
      {
        path: 'form/:id?',
        name: `${routeName}_form`,
        meta: {
          title: '职位编辑',
          permissions: ['job_manage'],
          hidden: true,
        },
        component: () => import('@/views/job/jobForm/index.vue'),
      },
      // {
      //   path: 'monitor',
      //   name: `${ routeName }_monitor`,
      //   meta: {
      //     title: '监控页',
      //     permissions: ['dashboard_monitor']
      //   },
      //   component: () => import('@/views/dashboard/monitor/monitor.vue')
      // },
      // {
      //   path: 'workplace',
      //   name: `${routeName}_workplace`,
      //   meta: {
      //     title: '工作台',
      //     keepAlive: true,
      //     permissions: ['dashboard_workplace'],
      //   },
      //   component: () => import('@/views/dashboard/workplace/workplace.vue'),
      // },
    ],
  },
];

export default routes;
