/*
 * @Description: 登录
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */
import { Alert, Form, Input, Button } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import logo from '@/assets/images/logo.svg';
import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { LoginParamsType, StateType } from '@/types/login';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
    closable
  />
);

const Login: React.FC<{}> = (props) => {

  const dispatch = useDispatch()

  const [redirect, setRedirect] = useState(window.location.href)

  const { status, redirectStr } = useSelector((state: {login: StateType}) => state.login);
  const loadingEffect = useSelector((state: {loading: any}) => state.loading);
  const submitting = loadingEffect.effects['login/login'] || false;

  const handleSubmit = async (values: LoginParamsType) => {
    dispatch({
      type: 'login/login',
      payload: { ...values, redirect: redirect },
    });
  };

  useEffect(()=>{
    if (!submitting && redirectStr)
    setRedirect(()=>redirectStr)

  }, [submitting])


  return (
    <div className={styles.container}>
      <div className={styles.lang}>
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>聊天监控系统</span>
          </div>
        </div>

        <div className={styles.main}>
            {status === 'error' && !submitting && <LoginMessage content="账户或密码错误"/>}
          <Form onFinish={handleSubmit} initialValues={{username: 'wangzhicheng', password: '123456'}}>
              <Form.Item name="username" rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}>
                <Input
                  allowClear
                  size="large"
                  placeholder="用户名: wangzhicheng" 
                  maxLength={50}
                  prefix={<UserOutlined style={{ color: '#1890ff',}} className={styles.prefixIcon}/>}
                />
              </Form.Item>
              <Form.Item name="password" rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}>
                <Input.Password
                  allowClear
                  size="large"
                  placeholder="密码: 123456" 
                  maxLength={20}
                  prefix={<LockTwoTone className={styles.prefixIcon} />}
                />
              </Form.Item>
              <Form.Item>
                <Button size="large" className={styles.submit} type="primary" htmlType="submit" loading={submitting}>登录</Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

