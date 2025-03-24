import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { RedditOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'employee';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/employee',
    name: routeName,
    redirect: '/employee/console',
    component: Layout,
    meta: {
      title: 'Employee',
      icon: renderIcon(RedditOutlined),
      permissions: ['employee_manage', 'employee_manage'],
      sort: 0,
    },
    children: [
      {
        path: 'manage',
        name: `${routeName}_manage`,
        meta: {
          title: '员工管理',
          permissions: ['employee_manage'],
          affix: true,
        },
        component: () => import('@/views/employee/manageList/index.vue'),
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
