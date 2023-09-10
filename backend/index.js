const express = require('express');
const bodyParser = require("body-parser")
const eventRoutes = require("./routes/eventroutes")
const app = express();
const path = require('path');
const cors = require('cors')

app.use(cors({origin:"*"}))
app.use(bodyParser.json())
// Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, '../frontend/todo')));

// Mock data (replace with actual database query)
// const events = [
//   { id: 1, title: 'Event 1', description: 'Description 1' },
//   { id: 2, title: 'Event 2', description: 'Description 2' },
//   // ... more events
// ];
app.use(eventRoutes)
// Endpoint to get events
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend'));
});

app.get('/events', (req, res) => {
  res.json(events);
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
