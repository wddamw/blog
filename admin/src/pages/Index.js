import React, {useState} from 'react'
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import '../static/css/Index.css'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Index(props) {

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = e => {
    if(e.key === 'ArticleList') {
      props.history.push('/index/list')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider collapsible defaultCollapsed={false} collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['ArticleList']} defaultOpenKeys={['sub1']} mode="inline">
          <Menu.Item key="0">
            <Icon type="user" />
            <span>个人信息</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <Icon type="desktop" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="ArticleList">文章列表</Menu.Item>
            <Menu.Item key="">草稿箱</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path='/index/' exact component={ ArticleList } />
              <Route path='/index/add/' exact component={ AddArticle } />
              <Route path='/index/add/:id' exact component={ AddArticle } />
              <Route path='/index/list/' exact component={ ArticleList } />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Index