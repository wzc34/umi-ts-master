/*
 * @Description: 路由
 * @Author: wangzhicheng
 * @Date: 2021-03-31 11:51:59
 */
export default [
    {
      path: '/user',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          layout: false,
          component: './User/login',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/index',
          name: '首页',
          icon: 'dashboard',
          component: './Home',
        },
        {
          path: '/chat',
          name: '聊天信息',
          icon: 'aliwangwang',
          component: './Chat',
        },
        {
          path: '/monitor',
          name: '自动封号',
          icon: 'table',
          routes: [
            {
              path: '/monitor/keywordsPreheat',
              name: '关键词预热',
              component: './Monitor/keywordsPreheat',
            },
            {
              path: '/monitor/keywordsConfigure',
              name: '关键词配置',
              component: './Monitor/keywordsConfigure',
            },
            {
              path: '/monitor/ranking',
              name: '排行',
              component: './Monitor/ranking',
            },
            {
              path: '/monitor/white-list',
              name: '白名单',
              component: './Monitor/whitelist',
            },
            {
              component: './404',
            },
          ],
        },
        {
          path: '/stats',
          name: '数据统计',
          icon: 'barChart',
          component: './Monitor/keywordsConfigure',
        },
        {
          path: '/system',
          name: '系统管理',
          icon: 'setting',
          routes: [
            {
              path: '/system/user',
              name: '用户管理',
              component: './Monitor/keywordsConfigure',
            },
            {
              path: '/system/role',
              name: '角色管理',
              component: './Monitor/keywordsConfigure',
            },
            {
              path: '/system/resource',
              name: '资源管理',
              component: './Monitor/keywordsConfigure',
            },
          ]
        },
        {
          path: '/',
          redirect: '/index',
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ]