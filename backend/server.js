const express = require('express');
const cors = require('cors');
const { openDB } = require('../database/database.js');

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000'
}));  // Abilita CORS per il dominio del frontend
app.use(express.json());  // Middleware per gestire il parsing del JSON

// Route per recuperare tutti i vini
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

// Route per aggiungere un vino al carrello
app.post('/api/addToCart', async (req, res) => {
  const { userId, wineId } = req.body;

  try {
    const db = await openDB();
    
    // Controlla se il vino è già nel carrello
    const existingItem = await db.get('SELECT * FROM cart WHERE user_id = ? AND wine_id = ?', [userId, wineId]);

    if (existingItem) {
      // Se è già presente, aggiorna la quantità
      await db.run('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND wine_id = ?', [userId, wineId]);
    } else {
      // Se non è presente, inserisci una nuova voce nel carrello
      await db.run('INSERT INTO cart (user_id, wine_id, quantity) VALUES (?, ?, ?)', [userId, wineId, 1]);
    }
    
    res.status(200).json({ message: 'Vino aggiunto al carrello con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiunta al carrello:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiunta al carrello' });
  }
});

// Route per recuperare gli elementi del carrello per un utente specifico
app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const db = await openDB();
    const cartItems = await db.all(`
      SELECT cart.id, wines.name, wines.price, cart.quantity 
      FROM cart 
      JOIN wines ON cart.wine_id = wines.id 
      WHERE cart.user_id = ?
    `, [userId]);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Errore nel recupero del carrello:', error);
    res.status(500).json({ error: 'Errore nel recupero del carrello' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
