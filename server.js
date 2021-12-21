const express = require('espress');
const path = require('path');
const api = require('./routes/notes.js');
const uniqid = require('uniqid');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);