/*
 * @Description: 常量
 * @Author: wangzhicheng
 * @Date: 2021-03-31 16:47:45
 */

export enum StorageKey {
    currentUser = 'currentUser',
    token = 'token',
    authority = 'authority',
}

 /**
 * websocket msgId
 */
export enum SocketMsgId {
    flrc_req = 6019, // 聊天信息
    flrc_res = 6020,
    cl2ch_heart_req = 6001, // 心跳
    cl2ch_heart_res = 6002,
    cl2ch_logout_req = 6005, // 退出
    cl2ch_logout_res = 6006,
}

/**
 *  channel
 */
export enum AppChannel {
    guild = 3, // 帮会
    friend = 5, // 好友聊天
}

/**
 * socket 名称
 */
export enum SocketName {
    chatMessage = 'chatMessage',
}

/**
 * 新消息
 */
export enum SocketNewMsg {
    guild_chat = 7001,
    role_rename = 7002,
    guild_rename = 7003,
    friend_chat = 7004,
}