import axios from 'axios'
//import qs from 'qs'
import { Message } from 'antd'

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 针对application/x-www-form-urlencoded配置qs解析
//axios.defaults.transformRequest = [data => { return qs.stringify(data) }]
// 配置cors跨域
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
// 配置超时时间
axios.defaults.timeout = 40000
// 配置请求拦截
axios.interceptors.request.use(
    /*
    config => {
            if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = `token ${store.state.token}`;
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        }
    */
);
// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
export default axios;