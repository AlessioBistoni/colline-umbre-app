// database.js
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function openDB() {
  return open({
    filename: path.resolve(__dirname, './wines.db'), // Percorso assoluto al database
    driver: sqlite3.Database
  });
}

module.exports = { openDB };
