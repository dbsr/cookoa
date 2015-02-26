/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

var request = require('./index.js'),
    testApp = require('../tests/app')('/request', request);

describe('request', function(){
  describe('when POST /request', function(){
    it('should return html for url requested', function(done){
      var requestOpts = {
        method: 'GET',
        url: 'http://httpbin.org'
      };

      testApp
        .post('/request')
        .send(requestOpts)
        .expect(200, done);
    })
  })
})
