/*
 * @Description: 关键词列表
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:53:44
 */
import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { Button, Row, Col, Input, Empty, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Category from './Category';
import AddForm from './AddForm';
import CustomTag from './CustomTag';
import { useDispatch, useSelector } from 'umi';
import { StateType, ITagItem } from '@/types/keywords';
import { getType, delType, addType, titleDesc, levelPropType, addFromPropType, levelOption } from '../constant';
const { Search } = Input;
const pageSize = 200;

interface IProps {
  type: string;
}

const TagList: React.FC<IProps> = (props) => {
  const { type } = props

  const [level, setLevel] = useState('全部')
  const [letter, setLetter] = useState('全部')
  const [num, setNum] = useState('')
  const [kw, setKw] = useState('')
  const [visible, setVisible] = useState(false)
  const [allData, setAllData] = useState<ITagItem[]>([]) // 按条件查询得到的全部值, 下面的data只是按当前页显示的多少条，这个是总数据
  const [data, setData] = useState<ITagItem[]>([]) // 显示在页面上的data, 分页显示
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const dispatch = useDispatch()

  const { govData, blackListData, scoreData, previewData } = useSelector((state: {keyWords: StateType}) => state.keyWords);
  const loadingEffect = useSelector((state: {loading: any}) => state.loading);
  const initLoading = loadingEffect.effects[getType[type]] || false;

  useEffect(()=>{
    getKeywordsList()
  }, [])

  /**
   * 获取数据
   */
  const getKeywordsList = () => {
    dispatch({
      type: getType[type],
      payload: {},
      callback: (data: ITagItem[]) => {
        initData(data);
        setAllData(data);
      }
    });
  }

  /**
   * 第一页数据
   * @param data 
   */
  const initData = (data: ITagItem[]) => {
    const arr = []
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        if (index < page * pageSize) {
          arr.push(item)
        } else {
          break;
        }
      }
    }
    setData(arr);
  }

  useEffect(()=>{
    if (page > 1) {
      for (let index = 0; index < allData.length; index++) {
        const item = allData[index];
        if (index < (page - 1) * pageSize) continue;
        if (index < page * pageSize) {
          data.push(item)
        } else {
          break;
        }
      }
      setData(()=>[...data]);
      setLoadingMore(false);
    }
  }, [page])

  useLayoutEffect(()=>{
    if (level || letter || num)
     getDataByLetterNum()

  }, [level, letter, num, kw])

  const handleQuery = useCallback((level: string, letter: string, num: string) => {
    setLevel(level);
    setLetter(letter);
    setNum(num);
    setAllDataByType();
    setPage(1);
  }, [level, letter])

  /**
   * 重新把数据放入allData
   */
  const setAllDataByType = () => {
    switch (type) {
      case '0':
        setAllData(govData);
        break;
      case '1':
        setAllData(blackListData);
        break;
      case '2':
        setAllData(scoreData);
        break;
      case '3':
        setAllData(previewData);
        break;
      default:
        break;
    }
  }

  /**
   * 按字母或数字得到data
   */
  const getDataByLetterNum = () => {
    let arr: Array<ITagItem> = allData
    if (level !== '全部') {
      if (allData.length > 0) {
        let levelArr = []
        for (let index = 0; index < allData.length; index++) {
          const item = allData[index];
          const score: number = item.Score
          if (score) {
            const myLevle = levelOption.find(item=>item.label === level)
            if (myLevle) {
              if (score >= myLevle.min && score < myLevle.max) levelArr.push(item)
            }
          }
        }
        arr = levelArr
      }
    }
    if (letter !== '全部') {
      if (arr.length > 0) {
        let letterNumArr = []
        for (let index = 0; index < arr.length; index++) {
          const item = arr[index];
          if (item.Pinyin && item.Pinyin.length > 0) {
            let pinyinStr = item.Pinyin.join('')
            if (letter) { // 首字母
              pinyinStr = pinyinStr.substr(0, 1)
              if (pinyinStr.toUpperCase() === letter) {
                letterNumArr.push(item)
              }
            }
            if (num) { // 包含数字
              if (pinyinStr.indexOf(num) > -1) {
                letterNumArr.push(item)
              }
            }
          }
        }
        arr = letterNumArr
      }
    }
    if (kw) {
      if (arr.length > 0) {
        const kwArr = []
        for (let index = 0; index < arr.length; index++) {
          const item = arr[index];
          if (item.Keyword) {
            const myIndex = item.Keyword.indexOf(kw)
            if (myIndex > -1) {
              kwArr.push(item)
            }
          }
        }
        arr = kwArr
      }
    }
    initData(arr);
    setAllData(arr)
  }

  const handleSearch = (value: string) => {
    if (value !== kw) {
      setKw(value);
      setAllDataByType()
      setPage(1)
    }
  }

  /**
   * 删除关键词
   * @param value 
   */
  const handleDeleteTag = useCallback((value: string, index: number) => {
    dispatch({
      type: delType[type],
      payload: {
        keyword: value,
      },
      callback: (res: {code: number})=>{
        if (res) {
          data.splice(index, 1)
          let newAlldata = [...allData]
          newAlldata.splice(index, 1)
          setData(()=>[...data])
          setAllData(()=>[...newAlldata])
          message.success('删除成功')

          dispatch({
            type: getType[type],
            payload: {},
            callback: () => {}
          });
        }
      }
    });
  }, [])

  /**
   * 加载更多
   */
  const loadMore = () => {
    setLoadingMore(true);
    setPage(()=>page + 1)
  }

  /**
   * 添加保存
   * @param value 
   */
  const handleSave = useCallback((value:{name: string, attr?: number, level?: number}, cb: ()=>{}) => {
    dispatch({
      type: addType[type],
      payload: {
        keyword: value.name,
        attr: value.attr || 0,
        score: value.level || null,
      },
      callback: (res: {code: number})=>{
        if (res) {
          if (res.code === 0) {
            setVisible(false)
            message.success('添加成功，请在关键词预热中查看')
            cb()
          }
          if (res.code === 7) {
            message.error('对不起，该关键词已存在, 请重新输入')
          }
        }
      }
    });
  }, [])

  const handleCancel = useCallback(()=>{
    setVisible(false)
  }, [])

  return (
    <>
        <Category handleQuery={handleQuery} isLevel={levelPropType[type]}/>
        <div style={{margin: '30px 0'}}>
          <Row justify="space-between">
            <Col>
              <Row align="middle" gutter={30}>
                <Col>
                  <Search placeholder="请输入关键词" onSearch={handleSearch} allowClear style={{ width: 300 }} />
                </Col>
                <Col>已经为你筛选出 <span style={{fontSize: 16, color: 'blue'}}>{allData.length}</span> 个结果</Col>
              </Row>
            </Col>
            <Col><Button type="primary" icon={<PlusOutlined />} onClick={()=>setVisible(true)}>新增关键词</Button></Col>
          </Row>
        </div>
        <AddForm isLevel={addFromPropType[type].isLevel} isAttr={addFromPropType[type].isAttr} visible={visible} handleOk={handleSave} onCancel={handleCancel} title={titleDesc[type].title} desc={titleDesc[type].desc}/>
        <Spin spinning={initLoading && data.length === 0}>
          {data && data.length > 0 ?
          <>
            <CustomTag isLevel={addFromPropType[type].isLevel} data={data} handleDeleteTag={handleDeleteTag} />
            <Row justify="center" style={{marginTop: 30}}>
            {data.length !== allData.length &&
              <Button style={{width: 300, borderRadius: 50}} onClick={()=>loadMore()} loading={loadingMore}>加载更多</Button>
            }
            {data.length > pageSize && data.length === allData.length && <Col>已经到底了~</Col>}
            </Row>
          </>
          :
          <Empty />
          }
        </Spin>
    </>
  );
};

export default TagList;
