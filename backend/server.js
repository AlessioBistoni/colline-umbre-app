const express = require('express');
const cors = require('cors');
const { openDB } = require('../database/database.js');

const app = express();
const port = 3001;

app.use(cors());  // Abilita CORS per tutte le rotte
app.use(express.json());  // Middleware per gestire il parsing del JSON

app.get('/api/wines', async (req, res) => {
  try {
    const db = await openDB();
    const wines = await db.all('SELECT * FROM wines');
    res.status(200).json(wines);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei vini' });
  }
});

// Route per il login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await openDB();
    const user = await db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (user) {
      res.status(200).json({ message: 'Login riuscito', user });
    } else {
      res.status(401).json({ message: 'Credenziali non valide' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il login' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
