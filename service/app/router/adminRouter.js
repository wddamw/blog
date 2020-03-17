'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app
    var adminAuth = app.middleware.adminAuth()
    router.post('/admin/checkLogin', controller.adminController.checkLogin)
    router.post('/admin/addArticle', adminAuth, controller.adminController.addArticle)
    router.post('/admin/updateArticle', adminAuth, controller.adminController.updateArticle)
    router.get('/admin/deleteArticle/:id',adminAuth,controller.adminController.deleteArticle)
};
