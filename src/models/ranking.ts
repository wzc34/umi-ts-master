/*
 * @Description: 排行
 * @Author: wangzhicheng
 * @Date: 2021-03-30 20:36:32
 */
import type { Reducer, Effect } from 'umi';
import { StateType } from '@/types/ranking';
import * as services from '@/services/ranking';

export type RankingModelType = {
  namespace: string;
  state: StateType;
  effects: {
    getScoreData: Effect;
    getScorePreheatData: Effect;
    getNameScoreData: Effect;
    getLetterNumData: Effect;
    getIpRoleData: Effect;
    resetScore: Effect;
  };
  reducers: {
    changeScoreData: Reducer<StateType>;
    changeScorePreheatData: Reducer<StateType>;
    changeNameScoreData: Reducer<StateType>;
    changeLetterNumData: Reducer<StateType>;
    changeIpRoleData: Reducer<StateType>;
  };
};

const Model: RankingModelType = {
  namespace: 'ranking',
  state: {
    scoreData: [],
    scorePreheatData: [],
    nameScoreData: [],
    letterNumData: [],
    ipRoleData: [],
  },
  effects: {
    * getScoreData({ payload, callback }, { call, put }) {
      const res = yield call(services.getScoreData, payload);
      if (res) {
        const { data } = res
        yield put({
          type: 'changeScoreData',
          payload: {
            data: data
          },
        });
        callback(data)
      }
    },
    * getScorePreheatData({ payload, callback }, { call, put }) {
      const res = yield call(services.getScorePreheatData, payload);
      if (res) {
        const { data } = res
        yield put({
          type: 'changeScorePreheatData',
          payload: {
            data: data
          },
        });
        callback(data)
      }
    },
    * getNameScoreData({ payload, callback }, { call, put }) {
      const res = yield call(services.getNameScoreData, payload);
      if (res) {
        const { data } = res
        yield put({
          type: 'changeNameScoreData',
          payload: {
            data: data
          },
        });
        callback(data)
      }
    },
    * getLetterNumData({ payload, callback }, { call, put }) {
      const res = yield call(services.getLetterNumData, payload);
      if (res) {
        const { data } = res
        yield put({
          type: 'changeLetterNumData',
          payload: {
            data: data
          },
        });
        callback(data)
      }
    },
    * getIpRoleData({ payload, callback }, { call, put }) {
      const res = yield call(services.getIpRoleData, payload);
      if (res) {
        const { data } = res
        yield put({
          type: 'changeIpRoleData',
          payload: {
            data: data
          },
        });
        callback(data)
      }
    },
    * resetScore({ payload, callback }, { call, put }) {
      const res = yield call(services.doResetScore, payload);
      // if (res) {
      //   const { data } = res
      //   yield put({
      //     type: 'changeIpRoleData',
      //     payload: {
      //       data: data
      //     },
      //   });
      //   callback(data)
      // }
    },
  },
  reducers: {
    changeScoreData(state, { payload }) {
      return { ...state, scoreData: payload.data };
    },
    changeScorePreheatData(state, { payload }) {
      return { ...state, scorePreheatData: payload.data };
    },
    changeNameScoreData(state, { payload }) {
      return { ...state, nameScoreData: payload.data };
    },
    changeLetterNumData(state, { payload }) {
      return { ...state, letterNumData: payload.data };
    },
    changeIpRoleData(state, { payload }) {
      return { ...state, ipRoleData: payload.data };
    },
  },
};
export default Model;