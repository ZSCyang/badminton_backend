import { http } from "../axios/axios";

const api_list = {
  getCategoryList: "/cook/common/getCategoryList",
  delCategory: "/cook/admin/delCategory",
  saveCategory: "/cook/admin/saveCategory",
  getDishesList: "/cook/common/menuPage",
  uploadImg:'/cook/admin/uploadImg',
  saveMenu:'/cook/admin/saveMenu',
  getMenuById:'/cook/common/getMenuById',
}

// export const loginApi = (data: any) => {
//   return http(api_list.login, "post", data);
// };

export const getCategoryList = (data: any) => {
  return http(api_list.getCategoryList, "get", data);
}
export const getDishesList = (data: any) => {
  return http(api_list.getDishesList, "post", data);
}
export const delCategory = (data: any) => {
  return http(api_list.delCategory, "post", data);
}
export const saveCategory = (data: any) => {
  return http(api_list.saveCategory, "post", data);
}
export const uploadImg = (data: any) => {
  return http(api_list.uploadImg, "post", data);
}
export const saveMenu = (data: any) => {
  return http(api_list.saveMenu, "post", data);
}
export const getMenuById = (data: any) => {
  return http(api_list.getMenuById, "get", data);
}