/*
 * Author:  Daan Mathot
 * Contact: daanmathot@gmail.com
 * License: See LICENSE
 */

'use strict';

let $ = require('cheerio'),
    _ = require('lodash');


function getTargetResult(target, html) {
  if (target === 'text()') {
    return $(html).text();
  }

  return $(html).attr(target);
}


function parseBranch(branch, html) {
  let branchResults = {};

  branch.mappings.forEach(function(mapping) {
    var selector = mapping.selector;
    html = $(html, selector);

    if (mapping.targets) {
      let curResult = {};
      Object.keys(mapping.targets).forEach(function(key) {
        var target = mapping.targets[key];
        curResult[key] = getTargetResult(target, html);
      });
      if (branchResults) {
        if (!(branchResults instanceof Array)) {
          branchResults = [branchResults];
        }
        branchResults.push(curResult);
      } else {
        branchResults = curResult;
      }
    }
  });

  return branchResults;
}

function parseHtml(html, mappings) {
  let result = {};
  mappings.forEach(function(branch) {
    let branchResult = parseBranch(branch, html);
    console.log(branchResult);

    if (branch.name === 'root') {
      result = _.extend(result, branchResult);
    } else {
      result[branch.name] = branchResult;
    }
  });

  return result;
}

module.exports = function *(next) {
  var parserOpts = this.request.body,
  html = parserOpts.html,
  mappings = parserOpts.mappings;

  this.body = parseHtml(html, mappings);
};
