/*
 * @Description: 新增关键词
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:53:44
 */
import React, { useCallback, useState } from 'react';
import { Modal, Form, Button, Row, Input, Select, Radio, Col, InputNumber, Table } from 'antd';
import { connect, useSelector } from 'umi';
import { StateType } from '@/types/whiteList';
import moment from 'moment';
const datetime = 'YYYY-MM-DD HH:mm:ss';

interface PeddingWhiteListProps {
 
  visible: boolean;
  onCancel: ()=> void;
  handleOk: any;
  peddingList: Array<any>
}


const PeddingWhiteList: React.FC<PeddingWhiteListProps> = (props) => {
 const { visible, onCancel, handleOk,peddingList} = props;

   //删除
const handleDelete = useCallback(async (arg:any)=>{
    // let deleteSuccess = await servies.deleteCount(arg?.white,arg?.type,arg?.role_id,arg?.ip,arg?.account);
 },[]);

 let selectRows = [];
 const columns = [
    {
      title: '白名单类型',
      dataIndex: 'type',
      render: value => <span>用户IP</span>
      
    },
    {
      title: '账号名称',
      dataIndex: 'GameCount',
     
    },
    {
      title: '角色ID',
      dataIndex: 'RoleId',
     
    },
    {
      title: 'IP地址',
      dataIndex: 'Ip',
     
    },
    {
      title: 'IP归属地',
      dataIndex: 'IPAddr',
    },
    {
        title: '创建人',
        dataIndex: 'account',
      },
    {
        title: '创建时间',
        dataIndex: 'add_time',
        render: value => <span>{moment.unix(value).utcOffset(8).format(datetime)}</span>
       
      },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a onClick={()=>{handleDelete(record)}}>删除</a>
        </>
      ),
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    selectRows = selectedRows
    },
    onSelect: (record, selected, selectedRows) => {
       
    //   console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
    //   console.log(selected, selectedRows, changeRows);
    selectedRows = selectedRows
    },
  };

  const onSearch = () => {

  }
  const handleChange = () => {

  }


  const footerButton = [
    <Button key="back" onClick={onCancel}>
     取消
  </Button>,
  <Button key="submit" type="primary"  onClick={()=>{handleOk(selectRows)}}>
    删除
  </Button>,
  ]

 return (
    <>
  <Modal
      destroyOnClose
      title={'待处理白名单'}
      visible={visible}
      centered
      footer={footerButton}
      width={800}
    //   onOk={handleOk}
      onCancel={onCancel}
    >
          <Table   rowSelection={{ ...rowSelection }} rowKey={record =>record.GameAccount} columns={columns} dataSource={peddingList}/>
    </Modal>
    </>
  );
};


const mapStateProps = (state) =>{
    return {
        peddingList:state.WhieList.peddingList
    }
}
export default connect(mapStateProps)(PeddingWhiteList);
