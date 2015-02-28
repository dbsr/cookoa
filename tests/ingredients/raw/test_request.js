/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

let request = require('../../../ingredients/raw/request.js'),
    assert = require('assert');

require('co-mocha');

describe('request raw ingredient', function() {
  it('should return a 200 response', function *(done) {
    let opts = {
          url: 'http://httpbin.org'
        },
        
        result = yield request(opts),
        response = result[0];

    // should be 200
    assert.equal(response.statusCode, 200);
    done();
  });
});
