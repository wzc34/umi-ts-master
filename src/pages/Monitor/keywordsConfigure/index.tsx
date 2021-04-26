/*
 * @Description: 关键词配置
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:53:44
 */
import React from 'react';
import { Tabs, Card, BackTop } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import TagList from './components/TagList';
import styles from './index.less';
const { TabPane } = Tabs;

const tabs = [
  { type: '0', title: '政府屏蔽字' },
  { type: '1', title: '黑名单关键词' },
  { type: '2', title: '积分封号关键词' },
  { type: '3', title: '积分预览关键词' },
]

const keywordsConfigure: React.FC<{}> = () => {

  const RenderContent = (type: string) => {
    return <TagList type={type} />
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

export default keywordsConfigure;
