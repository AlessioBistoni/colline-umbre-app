const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');
const { openDB } = require('../database/database.js');

const app = express();
const port = 3001;

// Configurazione multer per percorso temporaneo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Cartella di destinazione temporanea per i file caricati
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve la cartella uploads come statica

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

//route per rimuovere un elemento dal carrello
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

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const db = await openDB();
    
    // Ottieni la data e l'ora correnti
    const currentDate = new Date().toISOString().slice(0, 10); // Ottiene la data nel formato 'YYYY-MM-DD'
    const currentTime = new Date().toLocaleTimeString(); // Ottiene l'ora nel formato 'HH:MM:SS'

    // Inserisci il messaggio nel database con data e ora
    await db.run(
      'INSERT INTO contacts (name, email, message, sent_date, sent_time) VALUES (?, ?, ?, ?, ?)',
      [name, email, message, currentDate, currentTime]
    );

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Errore durante l\'invio del messaggio:', error);
    res.status(500).json({ error: 'Errore durante l\'invio del messaggio' });
  }
});


// Route per aggiungere un nuovo vino al catalogo con immagine
app.post('/api/wines', upload.single('image'), async (req, res) => {
  const { name, price, year, type, short_description, long_description } = req.body;
  const tempImagePath = req.file.path;
  const imageExtension = path.extname(req.file.originalname);

  try {
    const db = await openDB();

    // Inserisci il vino nel database senza immagine
    const result = await db.run(
      'INSERT INTO wines (name, price, year, type, short_description, long_description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, price, year, type, short_description, long_description]
    );

    const wineId = result.lastID;
    const newFileName = `${wineId}${imageExtension}`;
    const newImagePath = path.join('viniShop', newFileName); // Percorso relativo nella cartella public
    const dbImagePath = `/${newImagePath}`; // Percorso per il database

    // Rinomina e sposta l'immagine nella cartella viniShop
    fs.renameSync(tempImagePath, path.join(__dirname, '../public', newImagePath));

    // Aggiorna il percorso dell'immagine nel database
    await db.run('UPDATE wines SET image = ? WHERE id = ?', [dbImagePath, wineId]);

    res.status(200).json({ message: 'Vino aggiunto con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiunta del vino:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiunta del vino' });
  }
});

// Route per rimuovere un vino dal catalogo
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

// Route per scaricare i messaggi
app.get('/api/messages', async (req, res) => {
  try {
    const db = await openDB();
    const messages = await db.all('SELECT * FROM contacts');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei messaggi' });
  }
});


// Route per eliminare un messaggio
app.delete('/api/messages/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const db = await openDB();
    await db.run('DELETE FROM contacts WHERE id = ?', [messageId]);
    res.status(200).json({ message: 'Messaggio eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione del messaggio:', error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione del messaggio' });
  }
});

// Route per eliminare tutti i messaggi
app.delete('/api/messages', async (req, res) => {
  try {
    const db = await openDB();
    await db.run('DELETE FROM contacts');
    res.status(200).json({ message: 'Tutti i messaggi sono stati eliminati con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione di tutti i messaggi:', error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione di tutti i messaggi' });
  }
});

// Route per scaricare i messaggi in formato CSV
app.get('/api/messages/csv', async (req, res) => {
  try {
    const db = await openDB();
    const messages = await db.all('SELECT * FROM contacts');

    // Converti oggetti in formato CSV
    const csv = new ObjectsToCsv(messages);

    // Scrivi il CSV in una stringa
    const csvString = await csv.toString();

    // Imposta gli header per il download del file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="messages.csv"');
    res.status(200).send(csvString);
  } catch (error) {
    console.error('Errore nel generare il file CSV:', error);
    res.status(500).json({ error: 'Errore nel generare il file CSV' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const db = await openDB();
    const currentDate = new Date().toISOString().slice(0, 10); // Ottiene la data nel formato 'YYYY-MM-DD'
    
    // Calcola il totale degli importi dell'ordine
    let totalAmount = 0.0;
    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
    }
    
    // Inserisci l'ordine nella tabella degli ordini
    const result = await db.run('INSERT INTO orders (user_id, order_date, total_amount) VALUES (?, ?, ?)', [userId, currentDate, totalAmount]);
    const orderId = result.lastID;

    // Inserisci i dettagli dell'ordine nella tabella order_details
    for (const item of cartItems) {
      await db.run('INSERT INTO order_details (order_id, wine_id, quantity, price_per_unit) VALUES (?, ?, ?, ?)', [orderId, item.wine_id, item.quantity, item.price]);
    }

    // Pulisci il carrello dell'utente dopo aver completato l'ordine
    await db.run('DELETE FROM cart WHERE user_id = ?', [userId]);

    res.status(200).json({ message: 'Ordine completato con successo' });
  } catch (error) {
    console.error('Errore durante la creazione dell\'ordine:', error);
    res.status(500).json({ error: 'Errore durante la creazione dell\'ordine' });
  }
});

// Endpoint per recuperare tutti gli ordini
app.get('/api/admin/orders', async (req, res) => {
  try {
    const db = await openDB();
    const orders = await db.all(`
      SELECT o.*, u.nome, u.cognome, u.email 
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `);

    for (const order of orders) {
      const orderDetails = await db.all(`
        SELECT od.id, od.quantity, od.price_per_unit, w.name 
        FROM order_details od
        JOIN wines w ON od.wine_id = w.id
        WHERE od.order_id = ?
      `, [order.id]);
      order.order_details = orderDetails;
    }

    res.json(orders);
  } catch (error) {
    console.error('Errore durante il recupero degli ordini:', error);
    res.status(500).json({ error: 'Errore durante il recupero degli ordini' });
  }
});


// Route per registrare un nuovo utente
app.post('/api/register', async (req, res) => {
  const { email, password, nome, cognome } = req.body;

  if (!email || !password || !nome || !cognome) {
    return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
  }

  try {
    const db = await openDB();
    const result = await db.run('INSERT INTO users (email, password, nome, cognome) VALUES (?, ?, ?, ?)', [
      email,
      password,
      nome,
      cognome
    ]);
    const newUser = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID]);

    res.status(201).json({ message: 'Registrazione riuscita', user: newUser });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
