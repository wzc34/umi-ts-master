/*
 * @Description: 关键词
 * @Author: wangzhicheng
 * @Date: 2021-03-30 20:36:32
 */
import { history } from 'umi';
import type { Reducer, Effect, Subscription } from 'umi';
import * as services from '@/services/keywords';
import { StateType } from '@/types/keywords';
import { sortBy } from 'lodash';

export type KeywordsModelType = {
    namespace: string;
    state: StateType;
    effects: {
        getGovData: Effect;
        delGovWords: Effect;
        addGovWords: Effect;
        getBlackListData: Effect;
        delBlackListWords: Effect;
        addBlackListWords: Effect;
        getScoreData: Effect;
        delScoreWords: Effect;
        addScoreWords: Effect;
        getPreviewcData: Effect;
        delPreviewWords: Effect;
        addPreviewWords: Effect;
        getPreheatList: Effect;
        doPassPreheat: Effect;
        delPreheat: Effect;
    };
    reducers: {
        changeGovData: Reducer<StateType>;
        changeBlackListData: Reducer<StateType>;
        changeScoreData: Reducer<StateType>;
        changePreviewData: Reducer<StateType>;
        changePreheatData: Reducer<StateType>;
    };
};

const Model: KeywordsModelType = {
    namespace: 'keyWords',
    state: {
        govData: [],
        blackListData: [],
        scoreData: [],
        previewData: [],
        preheatData: [],
    },
    effects: {
        * getGovData({ payload, callback }, { call, put }) {
            const res = yield call(services.getGovData, payload);
            if (res) {
                const { data } = res
                yield put({
                    type: 'changeGovData',
                    payload: {
                        data: data
                    },
                });
                callback(data)
            }
        },
        * delGovWords({ payload, callback }, { call, put }) {
            const res = yield call(services.delGovWords, payload);
            callback(res)
        },
        * addGovWords({ payload, callback }, { call, put }) {
            const res = yield call(services.addGovWords, payload);
            callback(res)
        },
        * getBlackListData({ payload, callback }, { call, put }) {
            const res = yield call(services.getBlackListData, payload);
            if (res) {
                const { data } = res
                yield put({
                    type: 'changeBlackListData',
                    payload: {
                        data: data
                    },
                });
                callback(data)
            }
        },
        * delBlackListWords({ payload, callback }, { call, put }) {
            const res = yield call(services.delBlackListWords, payload);
            callback(res)
        },
        * addBlackListWords({ payload, callback }, { call, put }) {
            const res = yield call(services.addBlackListWords, payload);
            callback(res)
        },
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
        * delScoreWords({ payload, callback }, { call, put }) {
            const res = yield call(services.delScoreWords, payload);
            callback(res)
        },
        * addScoreWords({ payload, callback }, { call, put }) {
            const res = yield call(services.addScoreWords, payload);
            callback(res)
        },
        * getPreviewcData({ payload, callback }, { call, put }) {
            const res = yield call(services.getPreviewcData, payload);
            if (res) {
                const { data } = res
                yield put({
                    type: 'changePreviewData',
                    payload: {
                        data: data
                    },
                });
                callback(data)
            }
        },
        * delPreviewWords({ payload, callback }, { call, put }) {
            const res = yield call(services.delPreviewWords, payload);
            callback(res)
        },
        * addPreviewWords({ payload, callback }, { call, put }) {
            const res = yield call(services.addPreviewWords, payload);
            callback(res)
        },
        * getPreheatList({ payload, callback }, { call, put }) {
            const res = yield call(services.getPreheatList, payload);
            if (res) {
                let { data } = res
                if (data)
                data = sortBy(data, function(item){
                    return -item.AddTime; // 降序
                });
                yield put({
                    type: 'changePreheatData',
                    payload: {
                        data: data
                    },
                });
                callback(data)
            }
        },
        * doPassPreheat({ payload, callback }, { call, put }) {
            const res = yield call(services.doPassPreheat, payload);
            if (res) {
                const preheatRes = yield call(services.getPreheatList, payload);
                if (preheatRes) {
                    let { data } = preheatRes
                    if (data)
                    data = sortBy(data, function(item){
                        return -item.AddTime; // 降序
                    });
                    yield put({
                        type: 'changePreheatData',
                        payload: {
                            data: data
                        },
                    });
                    callback(data)
                }
            }
        },
        * delPreheat({ payload, callback }, { call, put }) {
            const res = yield call(services.delPreheat, payload);
            if (res) {
                const preheatRes = yield call(services.getPreheatList, payload);
                if (preheatRes) {
                    let { data } = preheatRes
                    if (data)
                    data = sortBy(data, function(item){
                        return -item.AddTime; // 降序
                    });
                    yield put({
                        type: 'changePreheatData',
                        payload: {
                            data: data
                        },
                    });
                    callback(data)
                }
            }
        },
    },
    reducers: {
        changeGovData(state, { payload }) {
            return { ...state, govData: payload.data };
        },
        changeBlackListData(state, { payload }) {
            return { ...state, blackListData: payload.data };
        },
        changeScoreData(state, { payload }) {
            return { ...state, scoreData: payload.data };
        },
        changePreviewData(state, { payload }) {
            return { ...state, previewData: payload.data };
        },
        changePreheatData(state, { payload }) {
            return { ...state, preheatData: payload.data };
        },
    },
};
export default Model;