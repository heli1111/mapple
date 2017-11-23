
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorites', function (table) {
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.integer('map_id').unsigned().references('id').inTable('maps');
        table.primary(['user_id','map_id'])
    });
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('favorites');
};
