// server.js
const express = require('express');
const cors = require('cors');
const { openDB } = require('../database/database.js');

const app = express();
const port = 3001;

app.use(cors());  // Abilita CORS per tutte le rotte

app.get('/api/wines', async (req, res) => {
  const db = await openDB();
  const wines = await db.all('SELECT * FROM wines');
  res.status(200).json(wines);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
