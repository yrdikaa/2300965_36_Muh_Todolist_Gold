/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary().notNullable();
        table.text('event_name');
        table.boolean('klik').defaultTo(false);
        table.timestamps(true,true)
      })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('events')
  };