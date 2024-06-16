const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { openDB } = require('../database/database.js');

const app = express();
const port = 3001;

// Configurazione multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Cartella di destinazione per i file caricati
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

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
      console.log('existingItem', existingItem);
      await db.run('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND wine_id = ?', [userId, wineId]);
    } else {
      // Se non è presente, inserisci una nuova voce nel carrello
      console.log('non esiste nel carrello', existingItem);
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
    SELECT cart.id, wines.id AS wine_id, wines.name, wines.price, cart.quantity 
    FROM cart 
    JOIN wines ON cart.wine_id = wines.id 
    WHERE cart.user_id = ?;
    `, [userId]);
    console.log('cartItems', cartItems);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Errore nel recupero del carrello:', error);
    res.status(500).json({ error: 'Errore nel recupero del carrello' });
  }
});

app.post('/api/cart/increase', async (req, res) => {
  const { userId, wineId } = req.body;

  try {
    const db = await openDB();
    const quantity = await db.get('SELECT cart.quantity FROM cart WHERE user_id = ? AND wine_id = ?', [userId, wineId]);
    console.log('quantity', quantity);
    await db.run('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND wine_id = ?', [userId, wineId]);
    console.log('quantità aumentata con successo')
    res.status(200).json({ message: 'Quantità aumentata con successo' });
  } catch (error) {
    console.log('Errore durante l\'aggiornamento della quantità:', error)
    console.error('Errore durante l\'aggiornamento della quantità:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento della quantità' });
  }
});

// Route per diminuire la quantità di un vino nel carrello
app.post('/api/cart/decrease', async (req, res) => {
  const { userId, wineId } = req.body;

  try {
    const db = await openDB();
    // Decrementa la quantità del vino nel carrello
    await db.run('UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND wine_id = ?', [userId, wineId]);

    // Verifica se la quantità è diventata zero dopo il decremento
    const checkZeroQuantity = await db.get('SELECT quantity FROM cart WHERE user_id = ? AND wine_id = ?', [userId, wineId]);

    // Se la quantità è diventata zero, rimuovi il vino dal carrello
    if (checkZeroQuantity.quantity === 0) {
      await db.run('DELETE FROM cart WHERE user_id = ? AND wine_id = ?', [userId, wineId]);
      console.log('vino rimosso dal carrello')
      res.status(200).json({ message: 'Vino rimosso dal carrello' });
    } else {
      console.log('quantità diminuita con successo')
      res.status(200).json({ message: 'Quantità diminuita con successo' });
    }
  } catch (error) {
    console.error('Errore durante la diminuzione della quantità:', error);
    console.error('user id ', userId);
    console.error('wine id ', wineId);
    

    res.status(500).json({ error: 'Errore durante la diminuzione della quantità' });
  }
});

app.post('/api/cart/remove', async (req, res) => {
  const { userId, wineId } = req.body;

  try {
    const db = await openDB();
    // Rimuove completamente l'elemento dal carrello
    await db.run('DELETE FROM cart WHERE user_id = ? AND wine_id = ?', [userId, wineId]);

    res.status(200).json({ message: 'Elemento rimosso dal carrello' });
  } catch (error) {
    console.error('Errore durante la rimozione dell\'elemento dal carrello:', error);
    res.status(500).json({ error: 'Errore durante la rimozione dell\'elemento dal carrello' });
  }
});



// Route per inviare messaggi di contatto
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const db = await openDB();
    await db.run('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Errore durante l\'invio del messaggio:', error);
    res.status(500).json({ error: 'Errore durante l\'invio del messaggio' });
  }
});

// Route per aggiungere un nuovo vino
app.post('/api/wines', async (req, res) => {
  const { name, price, year, type, short_description, long_description, image } = req.body;

  try {
    const db = await openDB();
    await db.run('INSERT INTO wines (name, price, year, type, short_description, long_description, image) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                 [name, price, year, type, short_description, long_description, image]);
    res.status(200).json({ message: 'Vino aggiunto con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiunta del vino:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiunta del vino' });
  }
});


// Per scaricare i messaggi 
app.get('/api/messages', async (req, res) => {
  try {
    const db = await openDB();
    const messages = await db.all('SELECT * FROM contacts');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei messaggi' });
  }
});

// Route per eliminare un vino
app.delete('/api/wines/:id', async (req, res) => {
  const wineId = req.params.id;

  try {
    const db = await openDB();
    await db.run('DELETE FROM wines WHERE id = ?', [wineId]);
    res.status(200).json({ message: 'Vino eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione del vino:', error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione del vino' });
  }
});


router.post('/api/wines', upload.single('image'), async (req, res) => {
  const { name, price, year, type, short_description, long_description } = req.body;
  const image = req.file.path;

  try {
    const db = await openDB();
    await db.run(
      'INSERT INTO wines (name, price, year, type, short_description, long_description, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, year, type, short_description, long_description, image]
    );
    res.status(201).json({ message: 'Vino aggiunto con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiunta del vino:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiunta del vino' });
  }
});

module.exports = router;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
