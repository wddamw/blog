'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app
    router.get('/blog/getTypeInfo', controller.blogController.getTypeInfo)
    router.get('/blog/getArticleList', controller.blogController.getArticleList)
    router.get('/blog/getArticleListById/:id', controller.blogController.getArticleListById)
    router.get('/blog/getArticleById/:id', controller.blogController.getArticleById)
};
