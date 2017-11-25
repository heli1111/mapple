// Database Table for Pins 

exports.up = function(knex, Promise) {
    return knex.schema.createTable('pins', function (table) {
        table.increments('pin_id').primary();
        table.string('pin_name');
        table.string('pin_description');
        table.string('pin_image');
        table.dateTime('pin_createdAt');
        table.decimal('pin_latitude', 9, 6).notNull();
        table.decimal('pin_longitude', 9, 6).notNull();
        table.integer('pin_user_id').unsigned().references('user_id').inTable('users');
        table.integer('pin_map_id').unsigned().references('map_id').inTable('maps')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pins');
};
  