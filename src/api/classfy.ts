import { http } from "../axios/axios";

const api_list = {
  getClassifyList: "/supply/getClassifyList",
  articleList: "/v1/article",
};

// export const loginApi = (data: any) => {
//   return http(api_list.login, "post", data);
// };

export const getClassifyList = (data: any) => {
  return http(api_list.getClassifyList, "get", data);
};
