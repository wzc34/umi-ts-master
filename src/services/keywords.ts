/*
 * @Description: 关键词
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */
import request from '@/utils/request';

//------------------------------------政府---------------------------------------
/**
 * 获取政府屏蔽字
 */
export async function getGovData() {
  return request('/keyword/gov/get', {
    method: 'POST',
  });
}

/**
 * 删除政府屏蔽字
 * @param params 
 */
export async function delGovWords(params) {
  return request('/keyword/gov/del', {
    method: 'POST',
    data: params,
  });
}

/**
 * 添加政府屏蔽字
 * @param params 
 */
export async function addGovWords(params) {
  return request('/keyword/gov/add', {
    method: 'POST',
    data: params,
  });
}
//------------------------------------黑名单---------------------------------------
/**
 * 获取黑名单名称关键词
 */
export async function getBlackListData() {
  return request('/keyword/black/get', {
    method: 'POST',
  });
}


/**
 * 删除黑名单名称关键词
 * @param params 
 */
export async function delBlackListWords(params) {
  return request('/keyword/black/del', {
    method: 'POST',
    data: params,
  });
}

/**
 * 添加黑名单名称
 * @param params 
 */
export async function addBlackListWords(params) {
  return request('/keyword/black/add', {
    method: 'POST',
    data: params,
  });
}
//------------------------------------积分封号---------------------------------------
/**
 * 获取积分封号关键词
 */
export async function getScoreData() {
  return request('/keyword/score/get', {
    method: 'POST',
  });
}


/**
 * 删除积分封号关键词
 * @param params 
 */
export async function delScoreWords(params) {
  return request('/keyword/score/del', {
    method: 'POST',
    data: params,
  });
}

/**
 * 添加积分封号关键词
 * @param params 
 */
export async function addScoreWords(params) {
  return request('/keyword/score/add', {
    method: 'POST',
    data: params,
  });
}
//------------------------------------积分预览---------------------------------------
/**
 * 获取积分预览关键词
 */
export async function getPreviewcData() {
  return request('/keyword/observe/get', {
    method: 'POST',
  });
}

/**
 * 删除积分预览关键词
 * @param params 
 */
export async function delPreviewWords(params) {
  return request('/keyword/observe/del', {
    method: 'POST',
    data: params,
  });
}

/**
 * 添加积分预览关键词
 * @param params 
 */
export async function addPreviewWords(params) {
  return request('/keyword/observe/add', {
    method: 'POST',
    data: params,
  });
}
//------------------------------------关键词预热---------------------------------------
/**
 * 关键词预热
 */
export async function getPreheatList() {
  return request('/keyword/warm', {
    method: 'POST',
  });
}

/**
 * 预热通过
 * @param params [{keyword: '', type: ''}]
 */
export async function doPassPreheat(params) {
  return request('/keyword/warm/pass', {
    method: 'POST',
    data: params
  });
}

/**
 * 预热删除
 * @param params [{keyword: '', type: ''}]
 */
export async function delPreheat(params) {
  return request('/keyword/warm/del', {
    method: 'POST',
    data: params
  });
}