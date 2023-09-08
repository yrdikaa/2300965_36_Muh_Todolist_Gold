const db = require("../config/knex");

class EventModel {
  tableName = "events";

  constructor() {}

  async getAll() {
    return await db.select().from(this.tableName);
  }

  async create({ event_name, klik = false }) {
    const newEvent = { event_name, klik };
    const query = await db.insert(newEvent).into(this.tableName).returning("*");
    return query;
  }

  async update(id, { event_name, klik = false }) {
    const updatedEvent = { event_name, klik };
    const query = await db(this.tableName)
      .where({ id })
      .update(updatedEvent)
      .returning("*");
    return query;
  }

  async deleteEvent(id) {
    const query = await db(this.tableName)
      .where({ id })
      .del()
      .returning("*");
    return query;
  }
}

module.exports = EventModel;


// // Get all events
// async function getAllEvents() {
//   try {
//     const events = await knex('events').select('*');
//     return events;
//   } catch (error) {
//     throw new Error('Error fetching events');
//   }
// }

// // Create a new event
// async function createEvent(newEvent) {
//   try {
//     const createdEvent = await knex('events').insert(newEvent).returning('*');
//     return createdEvent[0];
//   } catch (error) {
//     throw new Error('Error creating event');
//   }
// }

// // Update an event
// async function updateEvent(eventId, updatedEvent) {
//   try {
//     await knex('events').where({ id: eventId }).update(updatedEvent);
//     return true;
//   } catch (error) {
//     throw new Error('Error updating event');
//   }
// }

// // Delete an event
// async function deleteEvent(eventId) {
//   try {
//     await knex('events').where({ id: eventId }).del();
//     return true;
//   } catch (error) {
//     throw new Error('Error deleting event');
//   }
// }
// // see event only the days do u want
// async function fetchEventsWithDateCondition() {
//   try {
//     const events = await knex('events')
//       .select('*')
//       .where('event_date', '>=', '2023-09-28 13:00:00.000 +00700');

//     if (events.length === 0) {
//       throw new Error('No events found for the specified condition.');
//     }

//     console.log(events);
//   } catch (error) {
//     console.error('Error fetching events:', error.message);
//   } finally {
//     knex.destroy();
//   }
// }

// fetchEventsWithDateCondition();

// module.exports = {
//   getAllEvents,
//   createEvent,
//   updateEvent,
//   deleteEvent,
// };
