// Seed file for maps data

const mapsdata = require('../mapsdata.js');

exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then(function () {
      return knex('maps').insert(mapsdata);
    });
};

