/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

let thunkify = require('thunkify'),
    _request = require('request'),
    request = thunkify(_request);

module.exports = function *(next) {
  let requestOpts = this.request.body;
  this.body = yield request(requestOpts);
};
