import {Avatar, Divider} from 'antd'
import '../static/style/components/author.css'

const Author = () => (
    <div className='author-div comm-box'>
        <div><Avatar size={100} src='https://c-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.thumb.1900_0.jpeg'/></div>
        <div className='author-introducation'>
            学习……
            <Divider>社交账号</Divider>
            <Avatar size={28} icon='github' className='account'/>
            <Avatar size={28} icon='qq' className='account'/>
            <Avatar size={28} icon='wechat' className='account'/>
        </div>
    </div>
)

export default Author