// let ipUrl = 'http://localhost:7001/blog/'
let ipUrl = 'http://172.31.43.165:7001/blog/'

let servicePath = {
    getArticleList: ipUrl + 'getArticleList',
    getArticleById: ipUrl + 'getArticleById',
    getTypeInfo: ipUrl + 'getTypeInfo',
    getArticleListById: ipUrl + 'getArticleListById',
}

export default servicePath