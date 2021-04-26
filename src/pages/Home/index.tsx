/*
 * @Description: 首页
 * @Author: wangzhicheng
 * @Date: 2021-04-01 21:22:20
 */
import React, { useEffect } from 'react';
import { Card, Row, Col, Statistic, Avatar } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import eventBus from '@/utils/eventBus';

const Home: React.FC = (props) => {

  useEffect(()=>{
    eventBus.on("sayHello", handleSayHelloListener)

    return () => {
      eventBus.off('sayHello', handleSayHelloListener)
    }

  }, [])

  const handleSayHelloListener = (value) => {
    console.log('----------您好啊--------', value)
  }

  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={16}>
            <Col xs={24} xl={6}>
                <Statistic title="Active Users" value={112893} />
            </Col>
            <Col xs={24} xl={6}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            </Col>
            <Col xs={24} xl={6}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            </Col>
            <Col xs={24} xl={6}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            </Col>
        </Row>
      </Card>
      <Card title="项目" className={styles.card}>
        <Row>
          <Col xs={24} xl={8} onClick={()=>{
            eventBus.emit('sayHello', '天真')
          }}>
            <Card.Grid style={{width: '100%'}}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
                />
            </Card.Grid>
          </Col>
          <Col xs={24} xl={8}>
            <Card.Grid style={{width: '100%'}}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
                />
            </Card.Grid>
          </Col>
          <Col xs={24} xl={8}>
            <Card.Grid style={{width: '100%'}}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
                />
            </Card.Grid>
          </Col>
          <Col xs={24} xl={8}>
            <Card.Grid style={{width: '100%'}}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
                />
            </Card.Grid>
          </Col>
          <Col xs={24} xl={8}>
            <Card.Grid style={{width: '100%'}}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
                />
            </Card.Grid>
          </Col>
          <Col xs={24} xl={8}>
            <Card.Grid style={{width: '100%'}}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
                />
            </Card.Grid>
          </Col>
        </Row>
        
      </Card>
    </PageHeaderWrapper>
  );
}

export default Home;