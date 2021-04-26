/*
 * @Description: 登录类型
 * @Author: wangzhicheng
 * @Date: 2021-03-31 12:02:55
 */
export interface LoginParamsType {
    username: string;
    password: string;
}

export type StateType = {
    status?: 'ok' | 'error';
    currentAuthority?: 'user' | 'guest' | 'admin';
    redirectStr?: string,
};