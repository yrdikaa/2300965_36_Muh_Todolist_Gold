// const express = require('express');
const EventModel = require("../models/eventModel");
const eventModel = new EventModel();
// const eventmodel
// const apiPath = "/api/v1/events"
// const router = express.Router();
// const knex = require('../knexfile');

//read event
const readEventById = async (req, res) => {
  try {
    const eventId = req.params.id; // Assuming the event ID is passed as a URL parameter
    const event = await eventModel.getById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ event });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// create new event
const createEvent = async (req, res) => {
  try {
    const event = req.body;
    const newEvent = await eventModel.create(event);
    console.log();
    res.status(201).json({ newEvent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
};

const getAllEvents = async (req, res) => {
  const events = await eventModel.getAll();
  res.status(200).json({ events });
};


 // update event
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id; // Assuming the event ID is passed as a URL parameter
    const updatedEventData = req.body;
    
    // Assuming eventModel.update is a function that updates an event by ID
    const updatedEvent = await eventModel.update(eventId, updatedEventData);

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ updatedEvent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEvent = await eventModel.deleteEvent(id);

    if (deletedEvent.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const eventController = {
  getAllEvents,
  createEvent,
  updateEvent,
  readEventById,
  deleteEvent,// Add the updateEvent function here
};

module.exports = eventController;
  
// // Create a new event
// router.post('/', async (req, res) => {
//   try {
//     const newEvent = req.body;
//     const createdEvent = await knex('events').insert(newEvent).returning('*');
//     res.status(201).json(createdEvent[0]);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Update an event
// router.put('/:id', async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     const updatedEvent = req.body;
//     await knex('events').where({ id: eventId }).update(updatedEvent);
//     res.status(200).json({ message: 'Event updated' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Delete an event
// router.delete('/:id', async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     await knex('events').where({ id: eventId }).del();
//     res.status(200).json({ message: 'Event deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
