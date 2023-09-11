import { http } from "../axios/axios";

const api_list = {
  getMatchList: "/backend/match-score/match-list",
  addCore: "/backend/match-score/add-score",
}

// export const loginApi = (data: any) => {
//   return http(api_list.login, "post", data);
// };

export const getMatchList = (data: any) => {
  return http(api_list.getMatchList, "get", data);
}
export const addCore = (data: any) => {
  return http(api_list.addCore, "post", data);
}