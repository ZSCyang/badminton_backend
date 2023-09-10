
import { nprogressStart, nprogressClose } from "@/hooks/useNporgress";

import pinia from "@/stores/store";
import { useUserStore } from "@/stores/useUser";
import { useHistoryStore } from "@/stores/history";
import useLoading from "@/hooks/useLoading";
const { hideLoading, showLoading } = useLoading;
import { RouteLocationNormalized, Router, _RouteRecordBase } from "vue-router";

// 路由白名单，不需要登陆即可使用
const whiteList = ["/login", "/404", "/","/cookOrder/list"];

export function guard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    next();
  });

  router.afterEach((to: RouteLocationNormalized): void => {
    hideLoading();
    nprogressClose();

    // 添加缓存路由
    if (to.name && to.meta && to.meta.needCache) {
      useHistoryStore().addCacheView(to.name.toString());
    }
    const { name, path, meta, params, query } = to;
    if (to.meta && !to.meta.notNeedAuth) {
      useHistoryStore().addVisitedView({
        name,
        path,
        meta,
        params,
        query,
      } as _RouteRecordBase);
    }
  });
}
