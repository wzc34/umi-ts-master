/*
 * @Description: 用户登录
 * @Author: wangzhicheng
 * @Date: 2021-03-30 20:36:32
 */
import { history } from 'umi';
import type { Reducer, Effect, Subscription } from 'umi';
import { message } from 'antd';
import { stringify } from 'querystring';
import { doLogin, doLogout } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { StorageKey } from '@/constants'
import { clearAuthority, setAuthority } from '@/utils/authority';
import { StateType } from '@/types/login';
import { parse } from 'querystring';
import eventBus from '@/utils/eventBus';

export type LoginModelType = {
    namespace: string;
    state: StateType;
    effects: {
        login: Effect;
        logout: Effect;
    };
    reducers: {
        changeLoginStatus: Reducer<StateType>;
    };
    subscriptions?: {
        setup: Subscription;
    }
};
  
const Model: LoginModelType = {
    namespace: 'login',
    state: {
        status: undefined,
        redirectStr: window.location.href,
    },
    effects: {
        * login({ payload }, { call, put }) {
            const res = yield call(doLogin, payload);
            if (res) {
                const { data } = res
                localStorage.setItem(StorageKey.currentUser, JSON.stringify({username: payload.username}));
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: 'ok',
                        // currentAuthority: data.authoritiesStr[0],
                    },
                });
                const urlParams = new URL(payload.redirect);
                // const params = getPageQuery();
                const params =  parse(payload.redirect.split('?')[1]);
                let { redirect } = params as { redirect: string };
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (window.routerBase !== '/') {
                            redirect = redirect.replace(window.routerBase, '/');
                        }
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }

                history.replace(redirect || '/');
            } else {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: 'error',
                        redirectStr: payload.redirect
                    },
                });
                return ;
            }
        },
        * logout(_, { call }) {
            const { redirect } = getPageQuery();

            if (window.location.pathname !== '/user/login' && !redirect) {
                const res = yield call(doLogout);
                if (res && res.code === 0) {
                    message.success('退出成功');
                    clearAuthority()
                    history.push({
                        pathname: '/user/login',
                        search: stringify({
                          redirect: window.location.href,
                        }),
                    });
                    eventBus.emit('SocketLogout')
                }

            }
        },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            if (payload.status === 'ok') setAuthority(payload.currentAuthority);
            return {...state, status: payload.status, redirectStr: payload.redirectStr};
        },
    },
    // subscriptions:{
    //     setup({ dispatch, history, query }) {
    //         return history.listen(async ({ pathname, search, query}) => {
                
    //         })
    //     }
    // }
};
export default Model;