/*
 * @Description: 新增关键词
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:53:44
 */
import React, { useState } from 'react';
import { Modal, Form, Button, Row, Input, Select, Radio, Col } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { attrOption, levelOption } from '../constant';
const regNum = /^\+?[1-9][0-9]*$/; // 正整数
const regAllLetter = /^[A-Za-z]+$/; // 任意字母
const regAllNum = /^[1-9]\d*$/; // 任意数字
const regLetterNum = /^[A-Za-z]+[0-9]+$/; // 任意字母+数字
const regNumLetter = /^[1-9]+[A-Za-z]+$/; // 任意数字+字母
const initLen = 3
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20},
}

interface IAddFormProps {
  isAttr?: boolean;
  isLevel?: boolean;
  title: string;
  desc: string;
  visible: boolean;
  onCancel: ()=> void;
  handleOk: (value: {name: string}, cb: any) => any;
}

interface IFormItem {
  level?: number;
  name: string;
  attr?: number;
}


const AddForm: React.FC<IAddFormProps> = (props) => {
  const { isAttr, isLevel, title, desc, visible, onCancel, handleOk } = props;

  const [numForm] = Form.useForm();
  const [kwForm] = Form.useForm();

  const [numberVisible, setNumberVisible] = useState(false)
  const [len, setLen] = useState(initLen)
  const [numberInput, setNumberInput] = useState(false)
  const [minDisable, setMinDisable] = useState(false)
  const [limitOption, setLimitOption] = useState(null)

  /**
   * 关键词保存
   * @param value 
   */
  const handleSubmit = (value: IFormItem) => {
    handleOk(value, ()=>{
      kwForm.resetFields();
    })
  }

  /**
   * 选择表达式
   * @param value 
   */
  const handleChange = (value: number, option) => {
    if (value === 4 || value === 2) {
      setNumberInput(true)
      setNumberVisible(true)
    } else {
      setNumberInput(false)
    }
    setLimitOption(option)
  }

  /**
   * 指定长度确定
   * @param value 
   */
  const handleNumberSubmit = (value: {number: number}) => {
    setLen(value.number)
    setNumberVisible(false)
  }

  /**
   * 加减数字
   * @param num 
   */
  const handleChangeNumber = (num: number) => {
    const currentNum = numForm.getFieldValue('number') || 3
    if (validNum(currentNum)) {
      const newValue = currentNum + num
      if (newValue === 1) {
        setMinDisable(true)
      } else {
        setMinDisable(false)
      }
      numForm.setFieldsValue({number: newValue}) 
    }
  }

  const handleValidNumber = (_, value: any) => {
    if (!value) return Promise.reject('请输入数字')
    if (!validNum(value)) return Promise.reject('请输入正整数')
    return Promise.resolve();
  }

  /**
   * 正整数
   * @param value 
   */
  const validNum = (value: any) => {
    return regNum.test(value)
  }

  /**
   * 验证名称
   * @param _ 
   * @param value 
   */
  const handleValidName = (_, value: string) => {
    if (isAttr) {
      const attr: number = kwForm.getFieldValue('attr')
      if (attr) {
        if (!checkNameReg(attr, value)) return Promise.reject('格式不正确，请根据右边的属性输入')
      } else {
        return Promise.reject('请选择右边的属性')
      }
    }
    return Promise.resolve()
  }

  /**
   * 正则验证关键词
   * 1: '任意字母'
   * 2: '指定长度字母'
   * 3: '任意数字'
   * 4: '指定长度数字'
   * 5: '任意长度字母+数字'
   * 6: '任意长度数字+字母'
   */
  const checkNameReg = (attr: number, value: string) => {
    let flag = true
    switch (attr) {
      case 1:
        if (!regAllLetter.test(value)) flag = false
        break;
      case 2:
        if (!regAllLetter.test(value) || value.length !== len) flag = false
        break;
      case 3:
        if (!regAllNum.test(value)) flag = false
        break;
      case 4:
        if (!regAllNum.test(value) || value.length !== len) flag = false
        break;
      case 5:
        if (!regLetterNum.test(value)) flag = false
        break;
      case 6:
        if (!regNumLetter.test(value)) flag = false
        break;
    
      default:
        break;
    }
    return flag
  }

  /**
   * 关闭窗口重置一下数据
   */
  const handleDestroy = () => {
    onCancel();

    setNumberInput(false); 
    setLen(initLen);
    numForm.resetFields();
    kwForm.resetFields();
  }
  
  return (
    <>
    <Modal
      destroyOnClose
      title={`新增${title}`}
      visible={visible}
      centered
      onCancel={() => handleDestroy () }
      footer={null}
      width={800}
    >
      <Form {...formItemLayout} form={kwForm} scrollToFirstError onFinish={handleSubmit}>
        {isLevel && <Form.Item
          label="等级"
          name="level"
          rules={[{required: true, message: `请选择等级`}]}
        >
          <Radio.Group>
            {levelOption.map((item, i)=>
              <Radio key={item.value} value={item.value}>{item.label}</Radio>
            )}
          </Radio.Group>
        </Form.Item>}
        <Form.Item label={<div><span style={{color: '#ff4d4f', marginRight: 4, fontSize: 14, fontFamily: 'SimSun, sans-serif'}}>*</span>名称</div>} style={{ marginBottom: 0 }}>
          <Form.Item
            name="name"
            rules={[{required: true, message: `请输入${title}`}, {validator: handleValidName}]}
            style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}
          >
            <Input allowClear maxLength={100} placeholder={`请输入${title}`} />
          </Form.Item>
          {isAttr && <Form.Item
            name="attr"
            rules={[{ required: true, message: '请选择属性' }]}
            style={{ display: 'inline-block', margin: '0 8px' }}
          >
            <Select style={{ width: 180 }} onChange={handleChange} placeholder="请选择属性">
              {attrOption.map((item, i)=>
                <Option key={i} value={item.value}>{item.label}</Option>
              )}
            </Select>
          </Form.Item>}
          {numberInput && <Form.Item
            style={{ display: 'inline-block', width: 'calc(30% - 0px)'}}
          >
           <Row align="middle"><Col>指定长度为：{len}</Col><Col><Button type="link" onClick={()=> {
             setNumberVisible(true);
             numForm.setFieldsValue({number: len})
           }}>修改长度</Button></Col></Row>
          </Form.Item>}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 18 }} style={{paddingTop: 180}}>
          <Row justify="space-between" align="middle">
            <span>{desc}</span>
            <Button type='primary' htmlType="submit" size="large" style={{width: 100}}>保存</Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
    <Modal
      destroyOnClose
      title={limitOption?.children}
      visible={numberVisible}
      centered
      onCancel={() => { setNumberVisible(false); numForm.resetFields(); }}
      footer={null}
      width={500}
    >
      <Form form={numForm} onFinish={handleNumberSubmit}>
            <Row justify="center">
              <Button icon={<MinusOutlined />} onClick={()=>handleChangeNumber(-1)} disabled={minDisable}/>
                <Form.Item name="number" rules={[{validator: handleValidNumber}]} initialValue={len}>
                  <Input style={{width: 100, textAlign: 'center'}} maxLength={2} onChange={(e)=>{
                    const value: string = e.target.value
                    if (validNum(value)) {
                      const num = Number(value);
                      if (num === 1) {
                        setMinDisable(true)
                      } else {
                        setMinDisable(false)
                      }
                    }
                  }}/>
                </Form.Item>
              <Button icon={<PlusOutlined />} onClick={()=>handleChangeNumber(1)} />
            </Row>
          <Form.Item>
            <Row justify="center" gutter={20} style={{marginTop: 20}}>
              <Col><Button onClick={() => setNumberVisible(false)}>取消</Button></Col>
              <Col><Button type="primary" htmlType="submit">确定</Button></Col>
            </Row>
          </Form.Item>
      </Form>
    </Modal>
    </>
  );
};

export default  React.memo(AddForm);
