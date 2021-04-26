/*
 * @Description: 公共方法
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */
import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { useEffect, useState } from 'react';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

interface IRoute {
  children?: Array<IRoute>;
  icon: any;
  routes:Array<IRoute>;
  path: string;
  name: string;
  target: string;
}

export const getAuthorityFromRouter = (router: Array<IRoute>, pathname: string) => {
  const authority: any = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

/**
 * 获取storage值
 * @param key 
 */
export function getStorageData(key) {
  const [data, setData] = useState(()=> { return JSON.parse(localStorage.getItem(key)) });
  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(data));
  }, [data])
  return [data, setData];
}