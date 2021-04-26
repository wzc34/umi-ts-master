/*
 * @Description: 当前活跃
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */
import { Row, Col } from 'antd';
import React from 'react';
import styles from './index.less';


const CurrentActive: React.FC<{}> = () => {
  
  return (
    <>
      <div className={styles.currentActive}>
        <Row gutter={10}>
            <Col><b>当前活跃：</b>ltby”2263  assc-b:45646  assc-bxL:55 </Col>
            <Col><b>请求量：</b>660/s </Col>
        </Row>
      </div>
    </>
  );
};
export default CurrentActive;
