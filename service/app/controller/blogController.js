'use strict';

const Controller = require('egg').Controller

class BlogController extends Controller {
    async getTypeInfo() {
        const result = await this.app.mysql.select('type')
        this.ctx.body = {data: result}
    }
    async getArticleList(){
        let sql = 'SELECT article.id as id,'+
                    'article.title as title,'+
                    'article.introduce as introduce,'+
                    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                    'type.typeName as typeName '+
                    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                    'ORDER BY article.id DESC '
            const result = await this.app.mysql.query(sql)
            this.ctx.body={list:result}
    }
    async getArticleListById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
                    'article.title as title,'+
                    'article.introduce as introduce,'+
                    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                    'type.typeName as typeName '+
                    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                    'WHERE article.type_id=?'+
                    'ORDER BY article.id DESC '
            const result = await this.app.mysql.query(sql, [id])
            this.ctx.body={list:result}
    }
    async getArticleById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.article_content as article_content,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName ,'+
            'type.id as typeId '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id '+
            'WHERE article.id=?'
        const result = await this.app.mysql.query(sql, [id])
        this.ctx.body={data:result}
    }
}

module.exports = BlogController