/*
 * @Description: 弹出框
 * @Author: wangzhicheng
 * @Date: 2021-04-14 11:14:39
 */

import { Modal } from 'antd';
const { confirm } = Modal;

export const showConfirm = (title = '提示', text: string, callback: any) => {
    confirm({
      title,
      // className: 'confirmBox',
      icon: '',
      // centered: true,
      content: text,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        if (callback) callback()
      },
      onCancel() {
      },
    });
}