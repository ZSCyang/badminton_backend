
import { constantRouter, dynaRouters } from "@/router/index";
import _ from "lodash";
import { _RouteRecordBase } from "vue-router";
export const useHistoryStore = defineStore({
  id: "app-history-route",
  state: (): {
    historyList: _RouteRecordBase[];
    cachedViews: string[];
  } => ({
    historyList: [],
    cachedViews: [],
  }),

  actions: {
    // 本地菜单 根据路由元数据构建菜单列表
    // 添加访问过的路由
    addVisitedView(view: _RouteRecordBase) {
      if (
        view?.meta?.title &&
        !this.historyList.find((item) => item.name === view.name)
      ) {
        this.historyList.push(view);
      }
    },
    closeHistory(index: number) {
      this.historyList.splice(index, 1);
    },
    // 添加缓存路由
    addCacheView(name: string) {
      if (!this.cachedViews.includes(name)) {
        this.cachedViews.push(name);
      }
    },
    // 删除其他的路由
    deleteOtherVisitedView(view: _RouteRecordBase) {
      console.log(view);
      this.historyList = this.historyList.filter((item) => {
        return item.path === view.path;
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ["historyList"],
      },
    ],
  },
});
