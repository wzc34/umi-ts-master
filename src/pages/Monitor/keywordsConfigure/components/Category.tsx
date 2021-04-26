/*
 * @Description: 分类查询
 * @Author: wangzhicheng
 * @Date: 2021-03-31 19:53:44
 */
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import styles from '../index.less';
import {letterArr, levelArr, numArr} from '../constant';

interface IProps {
  isLevel?: boolean;
  handleQuery?: any;
}

const Category: React.FC<IProps> = (props) => {
  const { isLevel = false, handleQuery } = props

  const [level, setLevel] = useState('全部')
  const [letter, setLetter] = useState('全部')
  const [num, setNum] = useState('')

  const onChangeLevel = (item: string) => {
    setLevel(item)
    handleQuery(item, letter, num)
  }
  const onChangeLetter = (item: string) => {
    setLetter(item)
    setNum('')
    handleQuery(level, item, '')
  }
  const onChangeNum = (item: string) => {
    setNum(item)
    setLetter('')
    handleQuery(level, '', item)
  }

  const RenderTwoCategory = () => {
    return (
      <>
        <div className={styles.categoryBox}>
          <div className={styles.categoryRow}>
            <div style={{minWidth: 80}}>一级分类</div>
            <div>
              <Row align='middle'>
                {levelArr.map((item, i)=>
                  <Col key={i} className={styles.searchCol} onClick={()=>onChangeLevel(item)}><div className={level === item ? styles.active: null}>{item}</div></Col>
                )}
              </Row>
            </div>
          </div>
          <div className={styles.categoryRow}>
            <div style={{minWidth: 80}}>二级分类</div>
            <div>
              <Row align='middle'>
                {letterArr.map((item, i)=>
                  <Col key={i} className={styles.searchCol} onClick={()=>onChangeLetter(item)}><div className={letter === item ? styles.active : null}>{item}</div></Col>
                )}
                {numArr.map((item, i)=>
                  <Col key={i} className={styles.searchCol} onClick={()=>onChangeNum(item)}><div className={num === item ? styles.active : null}>{item}</div></Col>
                )}
              </Row>
            </div>
          </div>
        </div>
    </>
    )
  }

  const RenderOneCategory = () => {
    return (
      <>
      <div className={styles.categoryBox}>
        <div className={styles.categoryRow}>
          <div style={{minWidth: 80}}>一级分类</div>
          <div>
            <Row align='middle'>
              {letterArr.map((item, i)=>
                <Col key={i} className={styles.searchCol} onClick={()=>onChangeLetter(item)}><div className={letter === item ? styles.active : null}>{item}</div></Col>
              )}
              {numArr.map((item, i)=>
                <Col key={i} className={styles.searchCol} onClick={()=>onChangeNum(item)}><div className={num === item ? styles.active : null}>{item}</div></Col>
              )}
            </Row>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      { isLevel ? RenderTwoCategory() : RenderOneCategory() }
    </>
  );
};

export default React.memo(Category);
