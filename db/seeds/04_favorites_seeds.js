// Seed file for favorites data

const favoritesdata = require('../favoritesdata.js');

exports.seed = function(knex, Promise) {
  return knex('favorites').del()
    .then(function () {
      return knex('favorites').insert(favoritesdata);
    });
};

