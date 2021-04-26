/*
 * @Description: 标签
 * @Author: wangzhicheng
 * @Date: 2021-04-14 10:46:22
 */
import React from 'react';
import { Row, Col, Tooltip, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from '../index.less';
import { showConfirm } from '@/components/AntdModal';
import { levelOption } from '../constant';
import { ITagItem } from '@/types/keywords';

interface IProps {
    isLevel?: boolean;
    data: Array<ITagItem>;
    handleDeleteTag: any;
}

const CustomTag: React.FC<IProps> = (props) => {

    const { isLevel = false,  data, handleDeleteTag } = props

    const onConfirmDel = (value: string, index: number) => {
        showConfirm('删除', '您确定要删除关键词 [ '+ value +' ] 吗？', ()=>{
            handleDeleteTag(value, index)
        })
    }

    const RenderLevel = (item: ITagItem) => {
        if (isLevel) {
            const score = item.Score
            if (score) {
                const myLevle = levelOption.find(item=> score >= item.min && score < item.max)
                if (myLevle)
                return <div className={styles.levelLable}>{myLevle.label}</div>
            }
        }
        return <div/>
    }

    return (
        <>
            <Row gutter={30} style={{flexWrap: 'nowrap'}}>
                <Col style={{minWidth: 120}}>已添加标签</Col>
                <Col>
                    <Row gutter={30} wrap>
                    {data.map((item, i)=>
                        <Col key={i}>
                            <div onClick={()=>{}} className={styles.tagBox}>
                                <Row justify="space-between" align="middle">
                                   {RenderLevel(item)}
                                    <Tooltip title={<Row style={{flexDirection: 'column'}}><Col>{item.Keyword}</Col>{item.Score && <Col>积分：{item.Score || ''}</Col>}</Row>} color="blue">
                                        <div className={styles.kwellipsis}>
                                            <span>{item.Keyword}</span>
                                        </div>
                                    </Tooltip>
                                    <div style={{cursor: 'pointer'}} onClick={()=>onConfirmDel(item.Keyword, i)}>
                                    {/* <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={()=>onConfirmDel(item.Keyword, i)}> */}
                                        <CloseOutlined style={{fontSize: 10}} />
                                    {/* </Popconfirm> */}
                                    </div>
                                </Row>
                            </div>
                        </Col>
                    )}
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default React.memo(CustomTag);