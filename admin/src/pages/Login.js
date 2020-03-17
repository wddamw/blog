import React, {useState} from 'react'
import 'antd/dist/antd.css'
import {Card, Input, Button, Spin, Icon, message} from 'antd'
import '../static/css/login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'

function Login(props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = () => {
        setIsLoading(true)
        if(!userName || !password) {
            message.error('用户名密码不能为空！')
            setTimeout(() => {
                setIsLoading(false)
            })
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(res => {
            setIsLoading(false)
            if(res.data.isSuccess === '1') {
                localStorage.setItem('openId', res.data.openId)
                props.history.push('/index')
            } else {
                message.error('用户名密码错误！')
            }
        })
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return(
        <div className='login-div'>
            <Spin tip='Loading...' spinning={isLoading}>
                <Card title='Blog System' bordered={true}>
                    <Input
                        id='userName'
                        size='large'
                        placeholder='Enter your user name'
                        prefix={<Icon type='user' />}
                        onChange={(e) => {setUserName(e.target.value)}}
                     />
                     <br /><br />
                     <Input
                        id='password'
                        size='large'
                        placeholder='Enter your password'
                        prefix={<Icon type='key' />}
                        onChange={(e) => {setPassword(e.target.value)}}
                     />
                     <br /><br />
                     <Button type='primary' size='large' block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login