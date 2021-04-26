/*
 * @Description: 聊天信息
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:47:55
 */
import { Button, Divider, Dropdown, Menu, message, Input, Card } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import QueryForm from './components/QueryForm';
import SocketManager from '@/services/vo/socket/socketManager';
import { SocketMsgId, SocketName, StorageKey } from '@/constants';
import eventBus from '@/utils/eventBus';
import Protocol from '@/services/vo/socket/protocol';
// 心跳间隔时间
const count = 1000 * 5
// 断开重连
const disCount = 1000 * 4


/**
 * 查询
 */
const onQuerySubmit = () => {

}


const Chat: React.FC<{}> = () => {
  
  const sendHeartRef = useRef(null)
  const reconneteRef = useRef(null)

  // 当前用户
  const user: string = localStorage.getItem(StorageKey.currentUser) || ''
  let currentUser = null
  if (user) currentUser = JSON.parse(user)

  const [reconnect, setReconnect] = useState(0)

  useEffect(()=>{
     // 注册 socket
     SocketManager.RegisterSocket(SocketName.chatMessage);
     // 连接 socket
     SocketManager.Connect(SocketName.chatMessage);
  }, [])

  useEffect(()=>{

    // 监听socket连接成功后发送请求
    eventBus.on('GetChatMessage', sendChatMessage)

    // socket返回值
    eventBus.on('ReceiveData', handelReceiveMsg)

    // socket断开重连
    eventBus.on('SocketReconnent', handleReconnectSocket)

    // socket退出
    eventBus.on('SocketLogout', sendLogout)

  }, [])
  
  /**
   * 发送获取聊天信息请求
   */
  const sendChatMessage = async () => {
    const param = { account: currentUser.username }
    console.log('----------param-------------', param)
    const protocol = new Protocol(SocketMsgId.flrc_req, param)
    SocketManager.Send(protocol, SocketName.chatMessage)

    // sendHeartRef.current && clearTimeout(sendHeartRef.current)
    // sendSocketHeartRequest()
  }

  /**
   * 重连socket
   */
  const handleReconnectSocket = () => {
    setReconnect(1) // 重连
    reconneteRef.current && clearTimeout(reconneteRef.current)
    reconneteRef.current = setTimeout(() => {
      if (!SocketManager.isConnect(SocketName.chatMessage)) {
        SocketManager.RegisterSocket(SocketName.chatMessage);
        SocketManager.Connect(SocketName.chatMessage);
      }
    }, disCount);
  }

  /**
   * 发送心跳请求
   */
  const sendSocketHeart = async () => {
    console.log('心跳：', sendHeartRef.current)

    const param = { account: currentUser.username}
    const protocol = new Protocol(SocketMsgId.cl2ch_heart_req, param)
    sendHeartRef.current = setTimeout(() => {
      SocketManager.Send(protocol, SocketName.chatMessage)
      sendSocketHeart()
    }, count);
  }

  /**
   * 退出socket
   */
  const sendLogout = async () => {
    const param = { account: currentUser.username}
    console.log('---------socket退出-----', param)
    
    const protocol = new Protocol(SocketMsgId.cl2ch_logout_req, param)
    SocketManager.Send(protocol, SocketName.chatMessage)
    SocketManager.UnregisterSocket(SocketName.chatMessage)
    sendHeartRef.current && clearTimeout(sendHeartRef.current)
  }

  /**
   * 接收的消息
   * @param res 
   */
  const handelReceiveMsg = (res) => {
    if (res && res.data && res.data !== 'null') {
      const data = JSON.parse(res.data)
      console.log('--------recerve------data------------', data)
      switch (res.protocolID) {
        case SocketMsgId.flrc_res: // 聊天消息
        
        default:
            break;
      }
    }
  }

  return (
    <PageContainer>
      <QueryForm onSubmit={onQuerySubmit} />
      <Card title="聊天信息">

      </Card>
    </PageContainer>
  );
};

export default Chat;
