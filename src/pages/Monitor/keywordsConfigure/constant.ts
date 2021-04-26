/*
 * @Description: 常量
 * @Author: wangzhicheng
 * @Date: 2021-04-15 17:42:14
 */
export const letterArr = [
  '全部',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

export const numArr = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]

export const levelArr = [
  '全部',
  '高',
  '中',
  '低'
]

export const getType = {
  '0': 'keyWords/getGovData',
  '1': 'keyWords/getBlackListData',
  '2': 'keyWords/getScoreData',
  '3': 'keyWords/getPreviewcData',
}

export const delType = {
  '0': 'keyWords/delGovWords',
  '1': 'keyWords/delBlackListWords',
  '2': 'keyWords/delScoreWords',
  '3': 'keyWords/delPreviewWords',
}

export const addType = {
  '0': 'keyWords/addGovWords',
  '1': 'keyWords/addBlackListWords',
  '2': 'keyWords/addScoreWords',
  '3': 'keyWords/addPreviewWords',
}

export const titleDesc = [
  { title: '政府屏蔽字', desc: '提示：添加政府屏蔽字确定生效后政府关键词为“***”星号' },
  { title: '黑名单名字关键词', desc: '提示：添加黑名单关键词确定生效后，直接封号。' },
  { title: '积分封号关键词', desc: '提示：添加积分预览关键词确定生效后，到达一定积分后进行封号。' },
  { title: '积分预览关键词', desc: '提示：添加积分预览关键词确定生效后，可查看不封号。' },
]

export const levelPropType = {
  '0': false,
  '1': false,
  '2': true,
  '3': true,
}

export const addFromPropType = [
  { isLevel: false, isAttr: false },
  { isLevel: false, isAttr: true },
  { isLevel: true, isAttr: true },
  { isLevel: true, isAttr: true },
]

// 后台定义的值
export const kwType = {
  1027: '黑名单关键词',
  1028: '政府屏蔽字',
  1029: '积分封号关键词',
  1031: '积分预览关键词',
}

// 后台定义的attr
export const kwAttrType = {
  0: '--',
  1: '任意字母',
  2: '指定长度字母',
  3: '任意数字',
  4: '指定长度数字',
  5: '任意长度字母+数字',
  6: '任意长度数字+字母',
}

export const attrOption = [
  { label: kwAttrType[1], value: 1 },
  { label: kwAttrType[3], value: 3 },
  { label: kwAttrType[2], value: 2 },
  { label: kwAttrType[4], value: 4 },
  { label: kwAttrType[5], value: 5 },
  { label: kwAttrType[6], value: 6 },
]

export const levelOption = [
  { label: '高', value: 30, min: 30, max: 9999 },
  { label: '中', value: 15, min: 15, max: 30 },
  { label: '低', value: 5, min: 0, max: 15 },
]