
exports.up = function(knex, Promise) {
    return knex.schema.createTable('maps', function (table) {
        table.increments('').primary();
        table.string('map_name');
        table.string('map_description');
        table.dateTime('map_createdAt').notNull();
        table.integer('user_id').unsigned().references('id').inTable('users')
    }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('maps');
  };
  