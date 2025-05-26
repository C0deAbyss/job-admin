import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'company';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/company',
    name: routeName,
    redirect: '/company/manage',
    component: Layout,
    meta: {
      title: '公司',
      icon: renderIcon(DashboardOutlined),
      permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 0,
    },
    children: [
      {
        path: 'console',
        name: `${routeName}_console`,
        meta: {
          title: '公司信息',
          permissions: ['dashboard_console'],
          affix: true,
        },
        component: () => import('@/views/dashboard/console/console.vue'),
      },
      {
        path: 'company',
        name: `${routeName}_employee_manage`,
        meta: {
          title: '员工管理',
          permissions: ['employee_manage'],
          affix: true,
        },
        component: () => import('@/views/employee/manageList/index.vue'),
      },
      {
        path: 'manage',
        name: `${routeName}_job_manage`,
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
