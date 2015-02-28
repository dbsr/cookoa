/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

let cheerio = require('cheerio'),
    _ = require('lodash');


function getTargets(source, mapTarget) {
  let $ = cheerio.load(source);
  return _.map(
    $(mapTarget.selector),
    function(res) {
      let $ = cheerio.load(res),
          target = mapTarget.target,
          result = {};
        if (target.attr) {
          result[mapTarget.key] = $(target.element).attr(target.attr);
        } else {
          result[mapTarget.key] = $(target.element).text();
        }
        return result;
    });
}

function addResult(protoResult, mapTarget, result) {
  let root = mapTarget.root,
      key = mapTarget.key;
  if (protoResult[root]) {
    if (protoResult[root] instanceof Array) {
      if (!protoResult[root].length) {
        protoResult[root] = result;
      } else {
        result.forEach(function(res, idx) {
          protoResult[root][idx][key] = result[idx][key];
        });
      }
    }
  } else if (!protoResult[key]) {
    result = result[0][key];
    protoResult[key] = result;
  }

  return protoResult;
}

function parse(opts) {
  let source = opts.source,
      protoResult = opts.mappings;
  opts.mappingTargets.forEach(
      function(mapTarget) {
          let mapResult = getTargets(source, mapTarget);
          protoResult = addResult(protoResult, mapTarget, mapResult);
      });
  return protoResult;
}

module.exports = function (opts) {
  return function(callback) {
    let result = parse(opts);
    callback(null, result);
  };
};
