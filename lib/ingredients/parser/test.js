/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

var parser = require('./index.js'),
    testApp = require('../tests/app')('/parser', parser),
    fs = require('fs');


describe('parser', function(){
  describe('when POST /parser', function(){
    it('should return mappings for provided html', function(done){
      var 
          parserOpts = {
        html: fs.readFileSync('./test.html', 'utf-8'),
        mappings: [{
          name: 'results',
          mappings: [{
            selector: 'a.source',
            targets: {
              hoster: 'text()',
              link: 'href'
            }
         }]
       }]
      };
      testApp
        .post('/parser')
        .send(parserOpts)
        .expect(200)
        .end(function(err, res) {
          var response = res.body;
          console.log(response);
          done();
        });

    });
  });
});
