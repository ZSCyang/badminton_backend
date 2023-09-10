import router from "@/router";
import { _RouteRecordBase } from "vue-router";
//处理权限
export const hasPermission = (route: any, role: any) => {
  if (route.meta && route.meta.roles) {
    let tag = false;
    for (const ival of role) {
      if (route.meta.roles.includes(ival)) {
        tag = true;
        break;
      }
    }
    return tag;
    // console.log(route, route.meta.roles.includes(role));
  }
  //默认不设置权限
  return true;
};
// 菜单权限处理
export const filterAsyncRouter = (routerMap: any, roles: any) => {
  const accessedRouters = routerMap.filter((route: any) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length > 0) {
        route.children = filterAsyncRouter(route.children, roles);
      }

      return true;
    }
    return false;
  });
  return accessedRouters;
};
