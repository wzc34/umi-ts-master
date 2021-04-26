/*
 * @Description: 白名单管理
 * @Author: 周校宇
 * @Date: 2021-04-19 16:50:22
 */

import { AddCountParamsType, DeleteCountParamsType } from '@/types/whiteList';
import request from '@/utils/request';

 /**
 * ip白名单
 * @param params 
 */
export async function getWhiteList(params) {
 
    return request('/white/ip/get', {
      method: 'POST',
    });
 }

  /**
 * 账号白名单
 * @param params 
 */
export async function getAccountList(params) {
    return request('/white/account/get', {
      method: 'POST',
    });
 }

   /**
 * 待处理白名单
 * @param params 
 */
export async function getPeddingList(params) {
  return request('/white/pending/get', {
    method: 'POST',
  });
}

   /**
 * 删除待处理的白名单
 * @param params 
 */
export async function deletePeddingList(params:Array<any>) {
  const data = {
    whites: params
  }
  return request('/white/pending/del', {
    method: 'POST',
    data
  });
}

  /**
 * 添加白名单
 * @param params 
 */
export async function AddCount(params:AddCountParamsType) {
   const data = {
    white: params.white,
    type: params.type,
  }
  return request('/white/add', {
    method: 'POST',
    data
  });
}

/**
 * 删除白名单（根据后端的描述这个主要是添加到待处理的列表）
 * @param params 
 */
// export async function deleteCount(white:string,type:string,role_id:string,ip:string,account:string) {
//   const data = {
//    white: white,
//    type: type,
//    role_id:role_id,
//    ip:ip,
//    account:account
//  }
//  return request('/white/del', {
//    method: 'POST',
//    data
//  });
// }

export async function deleteCount(params:Array<any>) {
  const data = {
    whites: params
  }
 return request('/white/del', {
   method: 'POST',
   data
 });
}