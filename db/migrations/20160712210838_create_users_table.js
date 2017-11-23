// Database Table for Users

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('user_id').primary();
    table.string('user_username');
    table.string('user_password');
    table.string('user_email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
