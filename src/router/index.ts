

import { App } from "vue";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";

import { guard } from "@/permission";
import { MenuProps } from "@/types";
import Layout from "@/layout/index.vue";

export const constantRouter: Array<any> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/scoringManagement",
    meta: {
      title: "羽毛球计分管理",
    },
    component: Layout,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/pages/404/404.vue"),
  },
];

export const dynaRouters: Array<RouteRecordRaw & MenuProps> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/scoringManagement/index",
    hidden:true,
    meta: {
      type: "index",
      fixed: false,
      title: "羽毛球计分管理",
      icon: "Odometer",
    },
  },
  {
    path: "/scoringManagement",
    name: "scoringManagement",
    component: Layout,
    meta: {
      type: "index",
      fixed: true,
      title: "羽毛球计分管理",
      icon: "Odometer",
    },
    children: [
      {
        path: "/scoringManagement/index",
        name: "index",
        component: () => import("@/pages/scoringManagement/groupList.vue"),
        meta: {
          title: "组别管理",
          icon: "User",
        },
      },
      {
        path: "/scoringManagement/teamList",
        name: "teamList",
        component: () => import("@/pages/scoringManagement/teamList.vue"),
        meta: {
          title: "队员管理",
          icon: "User",
        },
      },
      // {
      //   path: "/cookOrder/dishesList",
      //   name: "dishesList",
      //   component: () => import("@/pages/cookOrder/dishesList.vue"),
      //   meta: {
      //     title: "队员管理",
      //     icon: "User",
      //   },
      // },
      {
        path: "/scoringManagement/scoreList",
        name: "scoreList",
        component: () => import("@/pages/scoringManagement/scoreList.vue"),
        meta: {
          title: "计分管理",
          icon: "Odometer",
        },
      },
    ]
  },
  // {
  //   path: "/classifyList",
  //   name: "ClassifyList",
  //   component: () => import("@/pages/classifyList/index.vue"),
  //   meta: {
  //     title: "router.classifyList",
  //     icon: "DocumentRemove",
  //     roles: [1],
  //   },
  // },
  // {
  //   path: "/cart",
  //   name: "Cart",
  //   component: () => import("@/pages/cart/index.vue"),
  //   meta: {
  //     title: "router.cart",
  //     icon: "DocumentRemove",
  //     roles: [1],
  //   },
  // },
  // {
  //   path: "/user",
  //   name: "User",
  //   meta: { title: "router.user", icon: "House" },
  //   children: [
  //     {
  //       path: "/userList",
  //       name: "UserList",
  //       component: () => import("@/pages/user/orderList.vue"),
  //       meta: {
  //         title: "router.userList",
  //         icon: "User",
  //         roles: [1],
  //       },
  //     },
  //     {
  //       path: "/userSetting",
  //       name: "UserSetting",
  //       component: () => import("@/pages/user/setting.vue"),
  //       meta: {
  //         title: "router.userPermissions",
  //         icon: "User",
  //         roles: [2],
  //       }
  //     },
  //   ],
  // },
  // {
  //   path: "/articleMarger",
  //   name: "ArticleMarger",
  //   meta: {
  //     title: "router.articleMarger",
  //     icon: "Notebook",
  //   },
  //   children: [
  //     {
  //       path: "/article",
  //       name: "Article",
  //       component: () => import("@/pages/article/index.vue"),
  //       meta: {
  //         title: "router.article",
  //         icon: "Tickets",
  //         roles: [1],
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: "/articleList",
  //       name: "ArticleList",
  //       component: () => import("@/pages/articleList/index.vue"),
  //       meta: {
  //         title: "router.articleList",
  //         icon: "Memo",
  //         roles: [1],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/postcard",
  //   name: "Postcard",
  //   meta: {
  //     title: "router.postcard",
  //     icon: "Brush",
  //   },
  //   children: [
  //     {
  //       path: "/md",
  //       name: "Md",
  //       component: () => import("@/pages/md/index.md"),
  //       meta: {
  //         icon: "Notification",
  //         title: "router.markdown",
  //         roles: [2],
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: "/ifarme",
  //   name: "Ifarme",
  //   meta: {
  //     title: "router.ifarme",
  //     icon: "Notification",
  //     roles: [2],
  //   },
  //   children: [
  //     {
  //       path: "/ylBlog",
  //       name: "YlBlog",
  //       component: () => import("@/layout/ifarme-page.vue"),
  //       meta: {
  //         title: "router.iframe.yl-blog",
  //         iframe_link: "http://139.159.200.153/",
  //       },
  //     },
  //     {
  //       path: "/vue",
  //       name: "Vue",
  //       component: () => import("@/layout/ifarme-page.vue"),
  //       meta: {
  //         roles: [2],
  //         title: "router.iframe.vue",
  //         iframe_link: "https://cn.vuejs.org",
  //       },
  //     },
  //     {
  //       path: "/vue-router",
  //       component: () => import("@/layout/ifarme-page.vue"),
  //       meta: {
  //         title: "router.iframe.vue-router",
  //         roles: [2],
  //         iframe_link: "https://router.vuejs.org/",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/error",
    name: "NotFound",
    hidden: true,
    meta: { title: "router.404" },
    component: () => import("@/pages/404/404.vue"),
  }
];

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_MODE === "hash"
      ? createWebHashHistory()
      : createWebHistory(),
  routes: [...dynaRouters],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  guard(router);
}

export default router;
