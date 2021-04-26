/*
 * @Description: 关键词预热
 * @Author: wangzhicheng
 * @Date: 2021-04-13 17:29:32
 */
import React, { useState, useRef, useEffect } from 'react';
import { Button, Divider, Card, Select, message, Input, Table, Row, Col, Tag } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch, useSelector } from 'umi';
import moment from 'moment';
import { showConfirm } from '@/components/AntdModal';
import { kwAttrType, kwType, levelOption } from '../keywordsConfigure/constant';
import { ITagItem, StateType, IPreheatItem } from '@/types/keywords';
const { Search } = Input;
const { Option } = Select;
const datetime = 'YYYY-MM-DD HH:mm:ss';

const keywordsPreheat: React.FC<{}> = () => {

  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [kw, setKw] = useState('')
  const [type, setType] = useState(null)

  const { preheatData } = useSelector((state: { keyWords: StateType }) => state.keyWords);
  const loadingEffect = useSelector((state: { loading: any }) => state.loading);
  const initLoading = loadingEffect.effects['keyWords/getPreheatList'] || false;

  useEffect(() => {
    getDataList()
  }, [])

  const getDataList = async () => {
    dispatch({
      type: 'keyWords/getPreheatList',
      payload: {},
      callback: (data: IPreheatItem[]) => {
        setData(data || [])
      }
    });
  }

  /**
   * 通过
   */
  const doPassPreheat = (arr: Array<{ keyword: string, type: number }>) => {
    dispatch({
      type: 'keyWords/doPassPreheat',
      payload: {
        keywords: arr,
      },
      callback: (data: IPreheatItem[]) => {
        setData(data || [])
        message.success('通过成功，请到关键词配置中查看')
      }
    });
  }

  /**
   * 删除
   */
  const delPreheat = (arr: Array<{ keyword: string, type: number }>) => {
    dispatch({
      type: 'keyWords/delPreheat',
      payload: {
        keywords: arr,
      },
      callback: (data: Array<ITagItem>) => {
        setData(data || [])
        message.success('删除成功')
      }
    });
  }

  /**
   * 操作一项
   * @param item 
   * @param type 
   */
  const handleSingle = (item: IPreheatItem, type: string) => {
    const arr = [{
      keyword: item.Keyword1,
      type: item.Kind,
    }]
    if (type === 'pass') {
      showConfirm('通过', '您确定要通过关键词 [ ' + item.Keyword1 + ' ] 吗？', () => {
        doPassPreheat(arr)
      })
    } else if (type === 'del') {
      showConfirm('删除', '您确定要删除关键词 [ ' + item.Keyword1 + ' ] 吗？', () => {
        delPreheat(arr)
      })
    }
  }
  /**
   * 批量操作
   * @param type 
   */
  const handleAll = (type: string) => {
    if (selectedRows.length > 0) {
      const arr = []
      selectedRows.forEach(item => {
        arr.push({
          keyword: item.Keyword1,
          type: item.Kind,
        })
      })
      if (type === 'pass') {
        showConfirm('通过', '您确定要通过选择的关键词吗？', () => {
          doPassPreheat(arr)
        })
      } else if (type === 'del') {
        showConfirm('删除', '您确定要删除选择的关键词吗？', () => {
          delPreheat(arr)
        })
      }
    } else {
      message.info('请选择操作项')
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };

  /**
   * 搜索
   */
  const handleSearch = (value: string) => {
    setKw(value);
  }

  /**
   * 选择种类查询
   */
  const handleChange = (value: string) => {
    setType(value)
  }

  useEffect(() => {
    if (kw || type) {
      getSearchList()
    } else {
      setData(preheatData || [])
    }

  }, [kw, type])

  /**
   * 搜索结果
   */
  const getSearchList = () => {
    let arr = []
    if (preheatData && preheatData.length > 0) {
      for (let index = 0; index < preheatData.length; index++) {
        const item = preheatData[index];
        if (kw && type) {
          const myIndex = item.Keyword1.indexOf(kw)
          if (myIndex > -1 && item.Kind === Number(type)) {
            arr.push(item)
          }
        } else {
          if (kw) {
            const myIndex = item.Keyword1.indexOf(kw)
            if (myIndex > -1) {
              arr.push(item)
            }
          }
          if (type) {
            if (item.Kind === Number(type)) {
              arr.push(item)
            }
          }
        }
      }
    }
    setData(arr)
  }

  const columns = [
    {
      title: '关键词种类',
      dataIndex: 'Kind',
      render: value => <span>{kwType[value]}</span>
    },
    {
      title: '关键词',
      dataIndex: 'Keyword1',
      render: value => <span>{value}</span>
    },
    {
      title: '关键词属性',
      dataIndex: 'Attr',
      render: (value, record) => {
        const score = record.Score
        let label = ''
        if (score) {
          const myLevle = levelOption.find(item => score >= item.min && score < item.max)
          if (myLevle)
            label = myLevle.label
        }
        return <><Tag>{kwAttrType[value]} </Tag> {label && <Tag>{label}</Tag>}</>
      }
    },
    {
      title: '添加时间',
      dataIndex: 'AddTime',
      render: value => <span>{moment.unix(value).utcOffset(8).format(datetime)}</span>
    },
    {
      title: '生效时间',
      dataIndex: 'WorkTime',
      render: value => <span>{moment.unix(value).utcOffset(8).format(datetime)}</span>
    },
    {
      title: '触发次数',
      dataIndex: 'Count',
    },
    {
      title: '创建人',
      dataIndex: 'Account',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => handleSingle(record, 'pass')}>通过</a>
          <Divider type="vertical" />
          <a onClick={() => handleSingle(record, 'del')}>删除</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col style={{ paddingBottom: 10 }}>
            <Row gutter={15} align="middle">
              <Col>
                <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => handleAll('pass')}>批量通过</Button>
              </Col>
              <Col>
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => handleAll('del')}>批量删除</Button>
              </Col>
              <Col><span>{`* 新增关键词累计：${data.length}`}</span></Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={15}>
              <Col style={{ paddingBottom: 10 }}>
                <Search allowClear placeholder="请输入关键词" onSearch={handleSearch} style={{ width: 220 }} />
              </Col>
              <Col>
                <Select style={{ width: 200 }} onChange={handleChange} placeholder="请选择类别">
                  <Option key={'全部'} value={null}>全部</Option>
                  {Object.keys(kwType).map((item, i) =>
                    <Option key={item} value={item}>{kwType[item]}</Option>
                  )}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table
          loading={initLoading}
          rowKey={record => record.Keyword1 + "@" + record.Kind}
          columns={columns}
          rowSelection={{ ...rowSelection }}
          dataSource={data}

        />
      </Card>

    </PageContainer>
  );
};

export default keywordsPreheat;
