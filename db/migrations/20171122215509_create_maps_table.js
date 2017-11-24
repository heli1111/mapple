// Database Table for Maps
exports.up = function(knex, Promise) {
    return knex.schema.createTable('maps', function (table) {
        table.increments('map_id').primary();
        table.string('map_name');
        table.string('map_description');
        table.dateTime('map_createdAt').notNull();
        table.dateTime('map_last_updated').notNull();
        table.decimal('map_latitude', 9, 6).notNull();
        table.decimal('map_longitude', 9, 6).notNull();
        table.integer('map_user_id').unsigned().references('user_id').inTable('users')
    }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('maps');
  };
  