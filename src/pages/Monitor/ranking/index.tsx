/*
 * @Description: 排行
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:53:44
 */
import React, { useState, useRef, useContext } from 'react';
import { Button, Divider, Tabs, Card, message, Input, BackTop } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import RankingList from './components/rankingList';
const { TabPane } = Tabs;

const tabs = [
  { type: '0', title: '积分排行榜' },
  { type: '1', title: '积分预览排行榜' },
  { type: '2', title: '名字积分排行榜' },
  { type: '3', title: '字母数字关键词排行榜' },
  { type: '4', title: 'IP角色排行榜' },
]

const RankingIndex: React.FC<{}> = () => {

  const RenderContent = (type: string) => {
    return <RankingList type={type} />
  }

  return (
    <PageContainer>
      <div className={styles.keywordsContainer}>
        <Tabs type="card">
          {tabs.map((item, index) =>
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

export default RankingIndex;
