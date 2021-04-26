/*
 * @Description: 页面布局
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
} from '@ant-design/pro-layout';
import React from 'react';
import defaultSettings from '../../config/defaultSettings';
import Footer from '@/components/Footer';
import { Link, history, useModel } from 'umi';
import RightContent from '@/components/RightContent';
import logo from '@/assets/images/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {

  const { initialState, setInitialState } = useModel('@@initialState');
  const { settings = defaultSettings } = initialState || {};

  const { children } = props

  // const menuDataRender = (menuList: any) =>
  //   menuList.map((item: any) => {
  //     const localItem = {
  //       ...item,
  //       children: item.children ? menuDataRender(item.children) : undefined,
  //     };
  //     return Authorized.check(item.authority, localItem, null);
  // });

  return (
    <>
      <ProLayout
        logo={logo}
        menuItemRender={(menuItemProps, defaultDom) => {
         return menuItemProps.isUrl ? (
            defaultDom
          ) : (
            <Link to={menuItemProps.path || '/'}>
              {defaultDom}
            </Link>
          )
        }}
        // menuDataRender={menuDataRender}
        breadcrumbRender={(routers = []) => {
          routers.forEach((item, i)=>{
            if (item.path.indexOf('#') === -1) item.path = '#' + item.path
          })
          if (routers && routers.length > 0 && routers[0].breadcrumbName === '首页') return routers;
          return [ 
            {
              path: '/',
              breadcrumbName: '首页',
            },
            ...routers 
          ]
        }}
        // breadcrumbRender={false}
        breadcrumbProps={{
          itemRender: ((route, params, routes, paths)=>{
              const last = routes.indexOf(route) === routes.length - 1;
              // 最后一个(当前路由)与第二个(一级菜单)不用跳转
              return last || routes.indexOf(route) === 1 ? (
                <span>{route.breadcrumbName}</span>
              ) : (
                <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
              );
            })
        }}
        rightContentRender={() => <RightContent />}
        onMenuHeaderClick={() => history.push('/')}
        footerRender={() => <Footer />}
        {...props}
        {...settings}
        menu={{
          defaultOpenAll: true,
        }}
      >
          {children}
      </ProLayout>
    </>
  );
};

export default BasicLayout;
