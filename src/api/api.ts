import { http } from "../axios/axios";

const api_list = {
  login: "/user/login",
  articleList: "/v1/article",
};

export const loginApi = (data: any) => {
  return http(api_list.login, "post", data);
};

export const articleList = (data: any) => {
  return http(api_list.articleList, "get", data);
};
