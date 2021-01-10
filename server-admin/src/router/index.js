import { createRouter, createWebHashHistory } from "vue-router";

import Main from "Pages/common/Main";
import MainHome from "Pages/common/MainHome"; // 首页
import NotFound from "Pages/common/NotFound"; // 404页面
import Login from "Common/Login"; // 登录页面

export default createRouter({
  history: createWebHashHistory(process.env.VUE_APP_BASEURL),
  // base: process.env.VUE_APP_BASEURL,
  routes: [
    {
      path: "/",
      // name: 'main',
      title: "博客后台管理系统",
      component: Main,
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: "/",
          name: "home",
          component: MainHome,
        },
        {
          path: "404",
          name: "sign-in-404",
          component: NotFound,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
      meta: {
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 跳转后返回顶部，浏览器前进后退保留原来位置
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
});
