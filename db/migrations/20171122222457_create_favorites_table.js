
// Database Table for Favorites 

exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorites', function (table) {
        table.integer('fav_user_id').unsigned().references('user_id').inTable('users');
        table.integer('fav_map_id').unsigned().references('map_id').inTable('maps');
        table.primary(['fav_user_id','fav_map_id'])
    });
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('favorites');
};
