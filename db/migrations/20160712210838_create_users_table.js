exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('').primary();
    table.string('password');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
