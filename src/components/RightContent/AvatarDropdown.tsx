/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */
import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useDispatch, useModel, } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { StorageKey } from '@/constants';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}


const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {

  // const { initialState } = useModel('@@initialState');
  const user: string = localStorage.getItem(StorageKey.currentUser) || ''
  let currentUser = null
  if (user) currentUser = JSON.parse(user)

  const dispatch = useDispatch()

  /**
   * 退出登录
   */
  const loginOut = async () => {

    dispatch({
      type: 'login/logout',
    });
  };

  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === 'logout') {
      loginOut();
      return;
    }
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );


  if (!currentUser || !currentUser.username) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src='https://placeimg.com/140/140/any' alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
