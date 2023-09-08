const express = require("express")
const router = express.Router()
const eventController = require("../controller/eventController")
const prefixPath = "/api/v1/event"

router.get(`${prefixPath}/ping`, (req,res) => res.send("pong"))
router.get(`${prefixPath}/all`, eventController.getAllEvents)
router.post(`${prefixPath}/new`, eventController.createEvent)
router.put(`${prefixPath}/update/:id`, eventController.updateEvent)
router.delete(`${prefixPath}/delete/:id`, eventController.deleteEvent)

module.exports = router