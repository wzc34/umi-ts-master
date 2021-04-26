/*
 * @Description: 用户类型
 * @Author: wangzhicheng
 * @Date: 2021-03-31 12:50:24
 */
export interface CurrentUser {
    avatar?: string;
    realName?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }