const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function setup() {
  const db = await open({
    filename: path.resolve(__dirname, './wines.db'), // Percorso assoluto al database
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS wines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      year INTEGER,
      type TEXT,
      description TEXT,
      image TEXT
    );

    INSERT INTO wines (name, year, type, description, image) VALUES ('Trivilino', 2018, 'Bianco', 'Chardonnay is a green-skinned grape variety used in the production of white wine. The variety originated in the Burgundy wine region of eastern France, but is now grown wherever wine is produced.', './viniShop/vino.jpg');
    INSERT INTO wines (name, year, type, description, image) VALUES ('Merlot', 2019, 'Rosso', 'Merlot is a dark blue-colored wine grape variety, that is used as both a blending grape and for varietal wines. The name Merlot is thought to be a diminutive of merle, the French name for the blackbird.', '/vini/merlot.jpg');
    INSERT INTO wines (name, year, type, description, image) VALUES ('Pinot Noir', 2017, 'Rosso', 'Pinot Noir is a red wine grape variety of the species Vitis vinifera. The name may also refer to wines created predominantly from Pinot noir grapes.', '/vini/pinotnoir.jpg');
    INSERT INTO wines (name, year, type, description, image) VALUES ('Sauvignon Blanc', 2020, 'Bianco', 'Sauvignon Blanc is a green-skinned grape variety that originates from the Bordeaux region of France. The grape most likely gets its name from the French words sauvage ("wild") and blanc ("white") due to its early origins as an indigenous grape in South West France.', '/vini/sauvignonblanc.jpg');
    INSERT INTO wines (name, year, type, description, image) VALUES ('Rosé', 2021, 'Rosè', 'Rosé wine incorporates some of the color from the grape skins, but not enough to qualify it as a red wine. It may be the oldest known type of wine, as it is the most straightforward to make with the skin contact method.', '/vini/rose.jpg');
  `);
}

setup().then(() => console.log('Database setup complete'));
