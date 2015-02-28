/*
 * author      : Daan Mathot (dydrmntion@gmail.com)
 * license     : see LICENSE
 */

'use strict';

/**
 * This is where we convert the raw generators (ingredients) to 
 * middlewares ready to use by our koa compose recipes.
 *
 * For now, we assume the parsed (JSON) request body to be the 
 * arguments.
 *
 * We return the result of our ingredients via the response.body (JSON)
 */

let requireDir = require('require-dir'),
    _ = require('lodash');

// let's require all raw ingredients in the 'raw' base directory.
let rawIngredients = requireDir('./raw'),
    ingredients = {};

// and add some special middleware sauce
_.forEach(
    rawIngredients,
    function(ingredient, name) {
      ingredients[name] = function *() {
        let opts = this.request.body;
        this.body = yield ingredient(opts);
      };
    });

module.exports = ingredients;
