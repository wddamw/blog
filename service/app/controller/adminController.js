'use strict';

const Controller = require('egg').Controller

class AdminController extends Controller {
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = 'select userName, password from admin_user where userName = ? and password = ?'
        const result = await this.app.mysql.query(sql, [userName, password])
        if(result.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId': openId}
            this.ctx.body = {isSuccess: '1', openId: openId}
        } else {
            this.ctx.body = {isSuccess: '-1'}
        }
    }
    async addArticle() {
        let article = this.ctx.request.body
        const result = await this.app.mysql.insert('article', article)
        this.ctx.body = {
            isSuccess: result.affectedRows,
            insertId: result.insertId
        }
    }
    async updateArticle() {
        let article = this.ctx.request.body
        const result = await this.app.mysql.update('article', article)
        this.ctx.body = {
            isSuccess: result.affectedRows
        }
    }
    async deleteArticle(){
        let id = this.ctx.params.id
        const result = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={
            isSuccess: result.affectedRows
        }
    }
}

module.exports = AdminController