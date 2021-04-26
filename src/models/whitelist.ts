/*
 * @Description: 用户登录
 * @Author: wangzhicheng
 * @Date: 2021-03-30 20:36:32
 */
import { history } from 'umi';
import type { Reducer, Effect, Subscription } from 'umi';
import { StorageKey } from '@/constants'
import { StateType } from '@/types/whiteList';
import { parse } from 'querystring';
import * as servies from '@/services/whitelist';

export type WhiteListModelType = {
    namespace: string;
    state: StateType;
    effects: {
        getWhiteList: Effect;
        getAccountList: Effect;
        getPeddingList: Effect;
    };
    reducers: {
        changeWhiteData: Reducer<StateType>;
        changeUserData: Reducer<StateType>;
        changePeddingDta: Reducer<StateType>
    };
    subscriptions?: {
        setup: Subscription;
    }
};
  
const Model: WhiteListModelType = {
    namespace: 'WhieList',
    state: {
        whiteList: [],
        peddingList:[],
        
    },
    effects: {
        * getWhiteList({ payload }, { call, put }) {
            const res = yield call(servies.getWhiteList, payload);
            if (res) {
                const { data } = res
                yield put({
                    type: 'changeWhiteData',
                    payload: {
                        data: data
                    },
                });
                // callback(data)
            }
        },
        * getAccountList({ payload }, { call, put }) {
            const res = yield call(servies.getAccountList, payload);
            if (res) {
                const { data } = res
       
                yield put({
                    type: 'changeUserData',
                    payload: {
                        data: data
                    },
                });
                // callback(data)
            }
        },
        * getPeddingList({ payload }, { call, put }) {
            const res = yield call(servies.getPeddingList, payload);
            if (res) {
                const { data } = res
       
                yield put({
                    type: 'changePeddingDta',
                    payload: {
                        data: data
                    },
                });

            }
        },
      
    },
    reducers: {
        changeWhiteData(state, { payload }) {
          return { ...state, whiteList: payload.data };
        },
        changeUserData(state, { payload }) {
            return { ...state, whiteList: payload.data };
        },
        changePeddingDta(state, { payload }) {
            return { ...state, peddingList: payload.data };
        },
    },

};
export default Model;