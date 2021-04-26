/*
 * @Description: 查询表单
 * @Author: wangzhicheng
 * @Date: 2021-04-01 15:41:03
 */
import React from 'react';
import { Card, Form, Row, Col, Select, Button } from 'antd';

interface CreateFormProps {
  onSubmit: () => void;
}

const QueryForm: React.FC<CreateFormProps> = (props) => {

  const { onSubmit } = props

  return (
    <Card bordered={false}>
      <Form onFinish={onSubmit}>
          <Row gutter={30}>
            <Col>
              <Form.Item label="游戏渠道" name="game_channel">
                <Select style={{width: 200}} placeholder="请选择">
                  <Select.Option value="0">App</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Row gutter={10}>
                <Col>
                <Form.Item>
                  <Button type="default" htmlType="reset">重置</Button>
                </Form.Item>
                </Col>
                <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
      </Form>

    </Card>
  );
};

export default QueryForm;
