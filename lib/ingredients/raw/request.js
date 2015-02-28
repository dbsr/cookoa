/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

let thunkify = require('thunkify'),
    _request = require('request');

module.exports = thunkify(_request);
