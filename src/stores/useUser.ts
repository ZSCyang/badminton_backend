
import { defineStore } from "pinia";
import { filterAsyncRouter } from "@/utils/permission";
import { dynaRouters } from "@/router";

import { loginApi } from "@/api/api";
import { _RouteRecordBase } from "vue-router";
export const useUserStore = defineStore("user", {
  state: (): {
    token: string;
    users: any;
    routers: any[];
    currentRouteName: any[];
  } => {
    return {
      token: "",
      users: {},
      routers: [],
      currentRouteName: [],
    };
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    // 获取 面包屑导航数据
    getBread: (state) => state.currentRouteName,
  },
  actions: {
    setUser(user: any) {
      const routers = markRaw(dynaRouters);
      const accessedRouters = filterAsyncRouter(routers, user.role);
      this.routers = accessedRouters;
    },
    setBreadcrumb(arr: any[]) {
      const newBreadArr = arr?.filter((item) => {
        return item.meta && JSON.stringify(item.meta) != "{}";
      });
      const titles = newBreadArr?.map((item) => {
        return {
          title: item?.meta?.title,
          path: item?.path,
        };
      });
      console.log(titles);
      this.currentRouteName = titles;
    },
    // user login
    login(userInfo: { username: string; password: string }) {
      const { username, password } = userInfo;
      const loginFrom: { username: string; password: string } = {
        username: username.trim(),
        password,
      };
      return new Promise<void>((resolve, reject) => {
        loginApi(loginFrom)
          .then((response: any) => {
            const { token, info } = response.data;
            console.log(token, info)
            this.token = token;
            this.users = info;
            this.setUser(info);
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },

    clearToken() {
      this.token = "";
    },
  },

  persist: {
    enabled: true,
    // strategies: [
    //   {
    //     storage: sessionStorage,
    //     paths: ["routers"],
    //   },
    //   // { storage: localStorage, paths: ["history"] },
    // ],
  },
});
