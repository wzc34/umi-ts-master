/*
 * @Description: 排行榜内容
 * @Author: wangzhicheng
 * @Date: 2021-04-19 10:58:00
 */
import React, { useState, useEffect } from 'react';
import { UndoOutlined, DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Table, message, Input, Row, Col, Space, Card } from 'antd';
import styles from '../index.less';
import { IDataType, StateType } from '@/types/ranking';
import { useDispatch, useSelector } from 'umi';
import { getType } from '../constant';
const regNum = /^\+?[1-9][0-9]*$/; // 正整数

interface IProps {
  type: string;
}

const RankingList: React.FC<IProps> = (props) => {

  const { type } = props

  const dispatch = useDispatch();

  const [data, setData] = useState<IDataType[]>([])
  const [level, setLevel] = useState<string>(null)


  const { scoreData, scorePreheatData, nameScoreData, letterNumData, ipRoleData } = useSelector((state: { ranking: StateType }) => state.ranking);

  const loadingEffect = useSelector((state: { loading: any }) => state.loading);
  const initLoading = loadingEffect.effects[getType[type]] || false;


  useEffect(() => {
    getList()
  }, [])

  /**
   * 获取数据
   */
  const getList = () => {
    dispatch({
      type: getType[type],
      payload: { level: !level ? null : level },
      callback: (data: IDataType[]) => {
        setData(data || []);
      }
    });
  }

  const handleQuery = () => {
    if (level && !regNum.test(level) && level !== '0') {
      message.error('请输入等于0或大于0的数字');
      return;
    }
    getList()
  }


  const handleReset = () => {

  }

  /**
   * 封号
   * @returns 
   */
  const handelCloseAccount = (record) => {

  }

  /**
   * 展开或缩小内容
   * @param record 
   */
  const handleClickContent = (record, index) => {
    record.open = !record.open
    data[index] = record
    setData(() => [...data])
  }

  /**
   * 聊天内容
   * @param value 
   * @param record 
   * @param index 
   * @returns 
   */
  const renderContent = (value: string[], record: any, index: number) => {

    if (!value || value.length === 0) {
      return;
    }
    const arr = []
    value.forEach((item, i) => {
      arr.push(<div key={i}>{item}</div>)
    })
    return (
      <Row style={{ flexWrap: 'nowrap' }}>
        <Col className={`${styles.contentBox} ${record.open ? styles.active : ''}`}>{arr}</Col>
        <Col className={`${styles.iconBox} ${record.open ? styles.active : ''}`}>
          <div onClick={() => handleClickContent(record, index)} style={{ cursor: 'pointer' }}>
            {record.open ? <UpOutlined /> : <DownOutlined />}
          </div>
        </Col>
      </Row>
    )
  }

  const columns = [
    {
      title: '聊天内容',
      dataIndex: 'content',
      width: 300,
      textWrap: 'word-break',
      render: (value: string[], record: any, index: number) => renderContent(value, record, index)
    },
    {
      title: '积分',
      dataIndex: 'score',
    },
    {
      title: '游戏',
      dataIndex: 'game',
    },
    {
      title: '平台',
      dataIndex: 'platform',
    },
    {
      title: '区服',
      dataIndex: 'server',
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '角色ID',
      dataIndex: 'role_id',
    },
    {
      title: '角色名',
      dataIndex: 'role_name',
    },
    {
      title: '等级',
      dataIndex: 'level',
    },
    {
      title: 'VIP',
      dataIndex: 'vip',
    },
    {
      title: '充值',
      dataIndex: 'recharge',
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
    },
    {
      title: '设备编码',
      dataIndex: 'device',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => handelCloseAccount(record)}>封号</a>
        </>
      ),
    },
  ]

  const ip_role_columns = [
    {
      title: '聊天内容',
      dataIndex: 'content',
      width: 300,
      textWrap: 'word-break',
      render: (value: string[], record: any, index: number) => renderContent(value, record, index)
    },
    {
      title: '游戏',
      dataIndex: 'game',
    },
    {
      title: '平台',
      dataIndex: 'platform',
    },
    {
      title: '区服',
      dataIndex: 'server',
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '角色ID',
      dataIndex: 'role_id',
    },
    {
      title: '角色名',
      dataIndex: 'role_name',
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => handelCloseAccount(record)}>封号</a>
        </>
      ),
    },
  ]


  return (
    <>
      <Card>
        <Row gutter={30}>
          <Col style={{ paddingBottom: 10 }}>
            <Space>
              <span>等级</span>
              <Input allowClear placeholder="请输入等级" style={{ width: 200 }} onChange={e => {
                const value = e.target.value
                setLevel(value)
              }} />
            </Space>
          </Col>
          <Col>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => handleQuery()}>查询</Button>
              <Button icon={<UndoOutlined />} onClick={() => handleReset()}>重置积分</Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Table
        title={() => <span>{`* 累计总数：${data.length}`}</span>}
        loading={initLoading}
        rowKey={record => record.role_id + "@" + record.ip}
        columns={type === '4' ? ip_role_columns : columns}
        dataSource={data}
      />
    </>
  );
};

export default RankingList;
