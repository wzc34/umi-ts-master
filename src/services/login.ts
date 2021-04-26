/*
 * @Description: 登录
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */
import { LoginParamsType } from '@/types/login';
import request from '@/utils/request';
import { Md5 } from 'ts-md5';
import qs from 'query-string'
import { StorageKey } from '@/constants';

export async function doLogin(params: LoginParamsType) {
  const data = {
    username: params.username,
    password: Md5.hashStr(params.password).toString()
  }
  return request('/op/login', {
    method: 'POST',
    data
  });
}

export async function doLogout() {
  const currentUser: string = localStorage.getItem(StorageKey.currentUser)
  if (currentUser)
  return request('/op/logout', {
    method: 'POST',
    data: JSON.parse(currentUser)
  });
}
