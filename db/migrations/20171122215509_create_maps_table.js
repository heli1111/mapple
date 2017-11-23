// Database Table for Maps
exports.up = function(knex, Promise) {
    return knex.schema.createTable('maps', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
        table.dateTime('createdAt').notNull();
        table.integer('user_id').unsigned().references('id').inTable('users')
    }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('maps');
  };
  