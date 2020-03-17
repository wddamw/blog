import Head from 'next/head'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import {Row, Col , Icon ,Breadcrumb  } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detail.css'

import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'
import 'highlight.js/styles/monokai-sublime.css'

const Detail = (props) => {

  const tocify = new Tocify()

  const renderer = new marked.Renderer()

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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

  return (
    <div>
      <Head>
          <title>Blog Details</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href="/list">Video List</a></Breadcrumb.Item>
                  <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            <div>
                <div className="detailed-title">
                  React Videos
                </div>
                <div className="list-icon center">
                  <span><Icon type="calendar"/> 2019-06-28</span>
                  <span><Icon type="folder"/> Video Tutorial</span>
                  <span><Icon type="fire"/>1000 Watch</span>
                </div>
                <div className="detailed-content" dangerouslySetInnerHTML={{__html: marked(props.article_content)}}/>
            </div>
            </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <div className='detail-nav comm-box'>
            <div className='nav-title'>Contents</div>
            <div>
              {tocify && tocify.render()}
            </div>
          </div>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Detail.getInitialProps = async(context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + '/' + id).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detail