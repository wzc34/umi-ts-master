/*
 * @Description: 排行
 * @Author: wangzhicheng
 * @Date: 2021-04-19 11:50:48
 */
import request from '@/utils/request';

/**
 * 积分
 * @param params 
 */
export async function getScoreData(params) {
  return request('/monitor/top_score', {
    method: 'POST',
    data: params,
  });
}
/**
 * 积分预览
 * @param params 
 */
export async function getScorePreheatData(params) {
  return request('/monitor/top_observe_score', {
    method: 'POST',
    data: params,
  });
}
/**
 * 名字积分
 * @param params 
 */
export async function getNameScoreData(params) {
  return request('/op/login', {
    method: 'POST',
    data: params,
  });
}
/**
 * 字母数字
 * @param params 
 */
export async function getLetterNumData(params) {
  return request('/op/login', {
    method: 'POST',
    data: params,
  });
}
/**
 * ip角色
 * @param params 
 */
export async function getIpRoleData(params) {
  return request('/monitor/top_ip', {
    method: 'POST',
    data: params,
  });
}

/**
 * 重置积分
 * @param params { observer: boolean }
 */
export async function doResetScore(params) {
  return request('/monitor/reset_score', {
    method: 'POST',
    data: params,
  });
}