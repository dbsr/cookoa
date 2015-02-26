/*
/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';


var koa = require('koa'),
    _ = require('koa-route'),
    bodyParser = require('koa-bodyparser');


module.exports = function(route, middlewares) {
  var app = koa();

  app.use(bodyParser());
  app.use(_.post(route, middlewares));

  var testApp = require('supertest').agent(app.listen());

  return testApp
};
