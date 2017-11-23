
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pins', function (table) {
        table.increments().primary();
        table.string('name');
        table.string('description');
        table.string('image');
        table.dateTime('map_createdAt').notNull();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.integer('map_id').unsigned().references('id').inTable('maps')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pins');
};
  