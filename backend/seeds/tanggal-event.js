/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del();
  await knex('events').insert([
    {event_name: 'Sample Event 1', klik: true},
    // {id: 2, date: '2',event_name: 'dadang'},
    // {id: 3, date: '3',event_name: 'dadang'},
  ]);
};
