// Seed file for users data

const favsdata = require('../favoritesdata.js');

exports.seed = function(knex, Promise) {
  return knex('favorites').del()
    .then(function () {
      return knex('favorites').insert(favsdata);
    });
};

