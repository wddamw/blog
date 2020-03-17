import React, { useState, useEffect } from 'react'
import { Row, Col, List, Modal, Button, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { confirm } = Modal

function ArticleList(props) {

    const [list, setList] = useState([])

    useEffect(() => {
        getList()
    }, [])

    //得到文章列表
    const getList = ()=>{
        axios({
                method:'get',
                url: servicePath.getArticleList,
                withCredentials: true,
                header:{ 'Access-Control-Allow-Origin':'*' }
            }).then(
                res=>{
                    setList(res.data.list)  
                    }
                )
    }
    const delArticle = (id)=>{
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.deleteArticle+id,{ withCredentials: true}).then(
                    res=>{ 
                            message.success('文章删除成功')
                            getList()
                        }
                    )
            },
            onCancel() {
                message.success('没有任何改变')
            },
         });
    }
    const updateArticle = (id) => {
        props.history.push('/index/add/' + id)
    }
    const addArticle = () => {
        props.history.push('/index/add')
    }

    return(
        <div>
            <Button type='primary' style={{ marginBottom: '1rem' }} onClick={addArticle}>添加文章</Button>
            <List
                header={
                    <Row className='list-div'>
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Col span={8}>
                            {item.title}
                        </Col>
                        <Col span={3}>
                            {item.typeName}
                        </Col>
                        <Col span={3}>
                            {item.addTime}
                        </Col>
                        <Col span={3}>
                            {item.view_count}
                        </Col>
                        <Col span={3}>
                            {item.view_count}
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>&nbsp;
                            <Button onClick={() => delArticle(item.id)}>删除 </Button>
                        </Col>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList