/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

let assert = require('assert'),
    fs = require('fs');

require('co-mocha');

describe('parser', function() {
  it('have correctly mapped the parsed result', function *(done) {
    let parser = require('../parser.js'),
        html = fs.readFileSync(__dirname + '/fixtures/parser.html', 'utf8'),
        opts = {
          source: html,
          mappings: {
            results: [],
          },
          mappingTargets: [{
            root: 'results',
            key: 'href',
            selector: 'div.title',
            target: {
              element: 'a',
              attr: 'href'
            }
          }, {
            root: 'results',
            key: 'filehost',
            selector: 'div.hoster',
            target: {
              element: 'a'
            }
          }, {
            root: 'results',
            key: 'filename',
            selector: 'div.title',
            target: {
              element: 'a'
            }
          }, {
            key: 'next',
            selector: '.pagination a[rel="next"]',
            target: {
              element: 'a',
              attr: 'href'
            }
          }],
        },
        
        parsed = yield parser(opts);

    // we should have 11 results
    assert.equal(parsed.results.length, 11);

    // the last result's href
    assert.equal(
        parsed.results[10].href, 
        '/l/Archer-2009-S06E08-HDTV-x264-KILLERS-rar/fr00t1q0');

    // the second result's filehost should be turbobit.net
    assert.equal(parsed.results[1].filehost, 'turbobit.net');

    done();
  });
});
