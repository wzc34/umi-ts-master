/*
 * @Description: 关键词类型
 * @Author: wangzhicheng
 * @Date: 2021-03-31 12:02:55
 */
export type StateType = {
    govData: ITagItem[];
    blackListData: ITagItem[];
    scoreData: ITagItem[];
    previewData: ITagItem[];
    preheatData: IPreheatItem[];
};

export interface ITagItem {
    Keyword: string;
    Pinyin: string[];
    Line: number;
    Score?: number;
}

export interface IPreheatItem {
    Kind: number;
    Keyword1: string;
    Score: number;
    Attr: number;
    AddTime: number;
    WorkTime: number;
    Count: number;
    Account: string;
}