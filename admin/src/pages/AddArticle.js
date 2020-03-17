import React, { useState, useEffect } from 'react'
import marked from 'marked'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import '../static/css/AddArticle.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import moment from 'moment'

const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {

    const [articleId,setArticleId] = useState(0) // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('') // 文章标题
    const [articleContent , setArticleContent] = useState('') // markdown的编辑内容
    const [articleContentHtml, setArticleContentHtml] = useState('预览内容') // html内容
    const [articleIntroduce,setArticleIntroduce] = useState() // 简介的markdown内容
    const [articleIntroduceHtml,setArticleIntroduceHtml] = useState('预览内容') // 简介的html内容
    const [showDate,setShowDate] = useState() // 发布日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectType,setSelectType] = useState('请选择文章类别') // 选择的文章类别

    useEffect(() => {
        getTypeInfo()
        let id = props.match.params.id
        if(id){
            getArticleById(id)
        }else{
            setShowDate(moment().format('YYYY-MM-DD HH:mm:ss'))
        }
    }, [props.match.params.id])

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    const changeArticleContent = (e) => {
        setArticleContent(e.target.value)
        setArticleContentHtml(marked(e.target.value))
    }

    const changeArticleIntroduce = (e) => {
        setArticleIntroduce(e.target.value)
        setArticleIntroduceHtml(marked(e.target.value))
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: {'Access-Control-Allow-Origin':'*'},
            withCredentials: true
        }).then(
            res => {
                setTypeInfo(res.data.data)
            }
        )
    }

    const selectTypeHandler = (e) => {
        setSelectType(e)
    }

    const articleTitleHandler = (e) => {
        setArticleTitle(e.target.value)
    }

    const saveArticle = () => {
        if(!articleTitle){
            message.error('文章标题不能为空！')
            return false
        } else if(!selectType) {
            message.error('文章类型不能为空！')
            return false
        } else if(!articleContent) {
            message.error('文章内容不能为空！')
            return false
        } else if(!articleIntroduce) {
            message.error('文章简介不能为空！')
            return false
        }
        let dataProps = {}
        dataProps.type_id = selectType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = articleIntroduce
        dataProps.addTime = (new Date(showDate.replace('-', '/')).getTime())/1000
        if(articleId === 0) {
            dataProps.view_count = 0
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if(res.data.isSuccess) {
                        setArticleId(res.data.insertId)
                        message.success('文章发布成功！')
                    } else {
                        message.error('文章发布失败！')
                    }
                }
            )
        } else {
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if(res.data.isSuccess) {
                        message.success('文章修改成功！')
                    } else {
                        message.error('文章修改失败！')
                    }
                }
            )
        }
        return true
    }

    const getArticleById = (id) => {
        axios({
            method: 'get',
            url: servicePath.getArticleById+id,
            withCredentials: true,
        }).then(
            res => {
                let article = res.data.data[0]
                setArticleId(article.id)
                setArticleTitle(article.title)
                setArticleContent(article.article_content)
                setArticleContentHtml(marked(article.article_content))
                setArticleIntroduce(article.introduce)
                setArticleIntroduceHtml(marked(article.introduce))
                setShowDate(article.addTime)
                setSelectType(article.typeId)
            }
        )
    }

    return(
        <div>
            <Row gutter={16}>
                <Col span={18}>
                    <Row gutter={[16, 16]}>
                        <Col span={20}>
                            <Input placeholder='博客标题' size='large' onChange={articleTitleHandler} value={articleTitle}/>
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectType} size='large' onChange={selectTypeHandler} value={selectType}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <TextArea
                                className='article-content'
                                rows={35}
                                placeholder='文章内容'
                                value={articleContent}
                                onChange={changeArticleContent}
                                onPressEnter={changeArticleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className='article-content-html' dangerouslySetInnerHTML={{__html: articleContentHtml}} />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Button size='large'>暂存文章</Button>
                        </Col>
                        <Col span={12}>
                            <Button type='primary' size='large' onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={12}>
                            <div className='data-select'>
                                <DatePicker
                                    onChange={(date, dateString) => setShowDate(dateString)}
                                    placeholder='发布日期'
                                    size='large'
                                    value={moment(showDate, 'YYYY-MM-DD HH:mm:ss')}
                                    showTime
                                />
                            </div>
                        </Col>
                        <Col span={24}>
                            <TextArea
                                className='article-introduce'
                                rows={20}
                                placeholder='文章简介'
                                value={articleIntroduce}
                                onChange={changeArticleIntroduce}
                                onPressEnter={changeArticleIntroduce}
                            />
                        </Col>
                        <Col span={24}>
                            <div className='article-introduce-html' dangerouslySetInnerHTML={{__html: articleIntroduceHtml}}></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle