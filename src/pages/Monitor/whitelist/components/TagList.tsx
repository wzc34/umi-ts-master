/*
 * @Description: 关键词列表
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:53:44
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, Input, Empty, message, Spin, Card,Select,Form,Table } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { CheckCircleOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { getType } from '../constant';
import moment from 'moment';
import styles from '../index.less';
import { connect } from "dva";
import * as servies from '@/services/whitelist';
import PeddingWhiteList from './PeddingModal';
import { StateType } from '@/types/whiteList';
import whitelist from '..';
const datetime = 'YYYY-MM-DD HH:mm:ss';
const formItemLayout = {}

  const rows = 10;
const { Search } = Input;
const { Option } = Select;

interface IProps {
  type: string;
  whiteList:Array<any>,
  // dispatch:any
}

let selectRows:any[] = [];

const TagList: React.FC<IProps> = (props) => {
const { type } = props 
const [visible, setVisible] = useState(false)


const onSearch = () => {

}
const handleChange = () => {

}
const handleSubmit = () =>{

}

const penddingClick = useCallback(()=>{
  setVisible(true)

},[])
//添加白名单
const handleAdd = useCallback(async()=>{
  let add = await servies.AddCount({white:'-----',type:1034})

},[])
//modal的删除
const modalCancel = useCallback(()=>{
  console.log("---");
  
  setVisible(false)

},[])
//modal的删除
const modaloK = useCallback(async (arg)=>{
  console.log("modal",arg);
  if(arg.length === 0) return message.error('请选择需要删除的选项');
  let deleteSuccess = await servies.deletePeddingList(arg);
  if(deleteSuccess.code === 0){
    setVisible(false)
  }
  //setVisible(false)

},[])
//单条删除
const selectDelete = useCallback(async(arg:any)=>{
  let arr = [];
  arr.push(arg);
  let deleteSuccess = await servies.deleteCount(arr);
},[])
//全选删除
const handleDelete = useCallback(async ()=>{
  if(Array.isArray(selectRows) && selectRows.length === 0) return message.error('请选择需要删除的选项');
    
   let deleteSuccess = await servies.deleteCount(selectRows);
},[]);

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
  selectRows = selectedRows
  },
  onSelect: (record, selected, selectedRows) => {
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
  selectedRows = selectedRows
  },
};


const Ipcolumns = [
    {
      title: '类别',
      dataIndex: 'type',
      render: value => <span>用户IP</span>
      
    },
    {
      title: 'ip地址',
      dataIndex: 'ip',
     
    },
    {
      title: 'ip归属地',
      dataIndex: 'ip_addr',
     
    },
    {
      title: '创建时间',
      dataIndex: 'add_time',
      render: value => <span>{moment.unix(value).utcOffset(8).format(datetime)}</span>
     
    },
    {
      title: '创建人',
      dataIndex: 'op_user',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a onClick={()=>{selectDelete(record)}}>删除</a>
        </>
      ),
    }
   
  ];
  const Accountcolumns = [
    {
      title: '类别',
      dataIndex: 'type',
      render: value => <span>用户</span>
      
    },
    {
      title: '账号名称',
      dataIndex: 'account',
     
    },
    {
      title: '角色ID',
      dataIndex: 'role_id',
     
    },
    {
      title: '添加时间',
      dataIndex: 'add_time',
      render: value => <span>{moment.unix(value).utcOffset(8).format(datetime)}</span>
     
    },
    {
      title: '创建人',
      dataIndex: 'op_user',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a onClick={()=>{selectDelete(record)}}>删除</a>
        </>
      ),
    }
   
  ];

  return (
    <>
      <Card>
        <Form {...formItemLayout} scrollToFirstError onFinish={handleSubmit}>
              <Row align="middle" gutter={15}>
              <Col>
              <Form.Item  label="IP白名单地址" name="username">
                <Input
                  allowClear
                  size="large"
                  placeholder="请输入关键字" 
                  maxLength={50}
                />
              </Form.Item>
              </Col>
              <Col>
              <Form.Item  label="创建时间" name="username">
                <Input
                  allowClear
                  size="large"
                  placeholder="请输入关键字" 
                  maxLength={50}
                 
                />
              </Form.Item>
              </Col>
               <Col>
                <Form.Item>
                 <Button size="large" className={styles.submit}  type="primary" htmlType="submit" >查询</Button>
                 </Form.Item>
               </Col>
              </Row>
        </Form>
     </Card>
     <Row justify="space-between" style={{paddingTop: 10,paddingBottom: 10}} >
                  <div>*ip白名单类型（{Number(props.whiteList.length)}）</div>
                  <div style={{marginRight: 10}}>
                  <Button  type="primary"  onClick={handleDelete}>批量删除</Button>,
                  <Button  type="primary" style={{marginRight:5}} onClick={penddingClick}>待处理白名单</Button>
                  <Button  type="primary" onClick={handleAdd} >新增Ip白名单</Button>
                  </div>

    </Row>
     <Table  rowSelection={{ ...rowSelection }}  rowKey={record => type === '0' ? record.ip : record.account} columns={type === '0' ? Ipcolumns : Accountcolumns } dataSource={props.whiteList}/>
      <PeddingWhiteList onCancel={modalCancel} handleOk={modaloK} visible={visible} />
        
    </>
  );
};


const mapStateProps = ({whiteList}) =>{
  return {}
}
function mapDispatchToProps(dispatch) {
  return ({})
}
export default connect(mapStateProps,mapDispatchToProps)(TagList);
// const mapStateProps = (state) =>{
//   return {
//       peddingList:state.WhieList.peddingList
//   }
// }
// export default connect(mapStateProps)(TagList);
// export default TagList


