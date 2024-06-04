const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function setup() {
  const db = await open({
    filename: path.resolve(__dirname, './users.db'), // Percorso assoluto al database
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT,
      nome TEXT,
      cognome TEXT,
      idVino INTEGER
    );

    INSERT INTO users (email, password, nome, cognome, idVino) 
    VALUES ('email1@example.com', 'password1', 'Simone', 'Billeri', 1);
    
    INSERT INTO users (email, password, nome, cognome, idVino) 
    VALUES ('email2@example.com', 'password2', 'Nome2', 'Cognome2', 2);
    
    INSERT INTO users (email, password, nome, cognome, idVino) 
    VALUES ('email3@example.com', 'password3', 'Nome3', 'Cognome3', 3);
    
    INSERT INTO users (email, password, nome, cognome, idVino) 
    VALUES ('email4@example.com', 'password4', 'Nome4', 'Cognome4', 4);
    
    INSERT INTO users (email, password, nome, cognome, idVino) 
    VALUES ('email5@example.com', 'password5', 'Nome5', 'Cognome5', 5);
  `);
}

setup().then(() => console.log('Database setup complete'));
