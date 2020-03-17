let adminUrl = 'http://localhost:7001/admin/'
let blogUrl = 'http://localhost:7001/blog/'

let servicePath = {
    checkLogin: adminUrl + 'checkLogin',
    getTypeInfo: blogUrl + 'getTypeInfo',
    addArticle: adminUrl + 'addArticle',
    updateArticle: adminUrl + 'updateArticle',
    getArticleList: blogUrl + 'getArticleList',
    deleteArticle: adminUrl + 'deleteArticle/' ,
    getArticleById: blogUrl + 'getArticleById/',
}

export default servicePath