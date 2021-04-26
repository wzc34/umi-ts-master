/*
 * @Description: 白名单
 * @Author: 周校宇
 * @Date: 2021-04-19 10:54:23
 */
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Tabs,Card,BackTop } from 'antd';
import React, { useState, useRef, useEffect,useCallback, useLayoutEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import TagList from './components/TagList';
// import { useSelector } from 'umi';
import { connect,useSelector } from "dva";
import { StateType } from '@/types/whiteList';


const { TabPane } = Tabs;

const tabs = [
  {type: '0', title: 'ip白名单'},
  {type: '1', title: '账号白名单'},
 
]
interface IProps {
  whiteList:Array<any>,
  dispatch:any,
  getDataList:()=>void
  getAccountList:()=>void
  getPeddingList:()=>void
}

const whiteList: React.FC<IProps> = (props) => {

  const {getDataList,getAccountList,getPeddingList} = props
  const { whiteList } = useSelector((state: {WhieList: StateType}) => state.WhieList);
   useEffect(()=>{  
     getDataList();
     getPeddingList();
  }, [])

  useLayoutEffect(()=>{})

   const handleChangeTab = useCallback((arg:any)=>{
  
     if(arg === 0){
       //ip白名单
       getDataList();
     }else{
       //账号白名单
       getAccountList();
     }
    
   },[])

  const RenderContent = (type: string) => {
 
     return <TagList type={type} whiteList={whiteList} />
  }
 

  return (
      <PageContainer>
      <div className={styles.whiteContainer}>
        <Tabs onChange={handleChangeTab} type="card">
          {tabs.map((item, index)=>
              <TabPane tab={item.title} key={item.type}>
                <Card bordered={false}>
                  {RenderContent(item.type)}
                </Card>
              </TabPane>
          )}
        </Tabs>
      </div>
      <BackTop />
    </PageContainer>
  );
};


const mapStateProps = ({whiteList}) =>{
  return {}
}
function mapDispatchToProps(dispatch) {
  return ({
    //ip白名单的数据
    getDataList: payload => dispatch({type:'WhieList/getWhiteList',payload}),
    //账号白名单的数据
    getAccountList: payload => dispatch({type:'WhieList/getAccountList',payload}),
     //账号白名单的数据
     getPeddingList: payload => dispatch({type:'WhieList/getPeddingList',payload}) 
    
  })
}
export default connect(mapStateProps,mapDispatchToProps)(whiteList);

