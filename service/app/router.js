'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/blogRouter')(app)
  require('./router/adminRouter')(app)
};
