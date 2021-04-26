/*
 * @Description: umi配置
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:21
 */
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
    immer: true,
  },
  locale: {
    antd: true,
    baseNavigator: true,
  },
  // chainWebpack(memo) {
  //   memo.module.rule('ts-in-node_modules').include.clear();
  //   return memo;
  // },
  history: {
    type: 'hash',
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  publicPath: './',
  fastRefresh: {},
});
