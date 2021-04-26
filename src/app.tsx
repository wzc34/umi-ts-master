/*
 * @Description: 运行时配置
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:21
 */
// import { queryCurrent } from '@/services/user';
import defaultSettings from '../config/defaultSettings';
import { Settings } from '@ant-design/pro-layout';
import { CurrentUser } from './types/user';
import { StorageKey } from './constants';
import { history } from 'umi';

export async function getInitialState(): Promise<{
  settings?: Partial<Settings>;
}> {
  return {
    settings: defaultSettings,
  };
}

/**
 * 覆写 render
 * @param oldRender 
 */
export function render(oldRender) {
  // fetch('/api/auth').then(auth => {
  //   if (auth.isLogin) { oldRender() }
  //   else { 
  //     history.push('/login'); 
  //     oldRender()
  //   }
  // });
  oldRender()
}

/**
 * 路由切换时
 * @param param0 
 */
export function onRouteChange({ location, routes, action }) {
  // token不存在，跳转到登录页
  if (location.pathname !== '/user/login') {
      const currentUser: boolean = localStorage.getItem(StorageKey.currentUser) ? true : false
      if (!currentUser) history.replace('/user/login')
  }
}