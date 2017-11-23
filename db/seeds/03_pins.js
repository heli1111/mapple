// Seed file for pins data

const pinsdata = require('../pinsdata.js');

exports.seed = function(knex, Promise) {
  return knex('pins').del()
    .then(function () {
      return knex('pins').insert(pinsdata);
    });
};

