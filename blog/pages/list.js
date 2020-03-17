import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import {Row, Col, List, Icon, Breadcrumb} from 'antd'
import '../static/style/pages/comm.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const ArticleList = (list) => {

  const [ mylist, setMyList ] = useState(list.list);
  
  useEffect(() => {
    setMyList(list.list)
  })

  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  return(
    <div>
      <Head>
        <title>列表</title>
      </Head>
      <Header/>
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>主页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            itemLayout='vertical'
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className='list-title'>{item.title}</div>
                <div className='list-icon'>
                  <span><Icon type='calender'/>{item.addTime}</span>
                  <span><Icon type='folder'/>{item.typeName}</span>
                  <span><Icon type='fire'/>{item.view_count}</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}/>
              </List.Item>
            )}
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author/>
            <Advert/>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

ArticleList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleListById + '/' + id).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return promise
}

export default ArticleList