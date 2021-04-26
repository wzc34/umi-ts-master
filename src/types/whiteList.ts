/*
 * @Description: 白名单类型
 * @Author: wangzhicheng
 * @Date: 2021-03-31 12:02:55
 */

export interface AddCountParamsType {
    white: string;
    type: Number;
}
export interface DeleteCountParamsType {
    white: string;
    type: string;
    role_id?:string,
    ip?:string
}
export type StateType = {
    whiteList: Array<any>;
    peddingList: Array<any>;
  
};