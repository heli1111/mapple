// Seed file for users data

const usersdata = require('../usersdata.js');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(usersdata);
    });
};

