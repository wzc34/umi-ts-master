/*
 * @Description: 排行
 * @Author: wangzhicheng
 * @Date: 2021-03-31 12:02:55
 */
export type StateType = {
  scoreData: [];
  scorePreheatData: [];
  nameScoreData: [];
  letterNumData: [];
  ipRoleData: [];
};

export interface IDataType {
  account: string;
  content: [];
  device?: string;
  game: string;
  ip: string;
  level?: number;
  platform: number;
  recharge?: number;
  role_id?: number;
  role_name?: string;
  score?: number;
  server: number;
  vip?: number;
}