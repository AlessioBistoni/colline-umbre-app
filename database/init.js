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
      short_description TEXT,
      long_description TEXT,
      image TEXT
    );

    INSERT INTO wines (name, year, type, short_description, long_description, image) 
    VALUES ('Chianti Classico', 2018, 'Rosso', 
    'Il Chianti Classico è un icona dei vini italiani.', 
    'Il Chianti Classico è uno dei vini più celebri e apprezzati della Toscana. Prodotto nella regione del Chianti, è noto per il suo gusto robusto e il caratteristico aroma di ciliegia. Questo vino rosso è perfetto per accompagnare piatti di carne o formaggi stagionati. Ha una storia antica e una tradizione che si tramanda da secoli.', 
    './viniShop/vino.jpg');
    
    INSERT INTO wines (name, year, type, short_description, long_description, image) 
    VALUES ('Pinot Grigio', 2019, 'Bianco', 
    'Il Pinot Grigio è un vino fresco e fruttato.', 
    'Il Pinot Grigio è un vino bianco leggero e fresco, originario della regione del Veneto. Con il suo profumo fruttato e il gusto fresco e vivace, è l accompagnamento perfetto per piatti a base di pesce o antipasti leggeri. È apprezzato per la sua versatilità e la sua facilità di abbinamento con una varietà di piatti.', 
    './vini/pinotgrigio.jpg');
    
    INSERT INTO wines (name, year, type, short_description, long_description, image) 
    VALUES ('Prosecco', 2020, 'Spumante', 
    'Il Prosecco è uno spumante italiano frizzante e versatile.', 
    'Il Prosecco è un vino spumante italiano famoso per il suo gusto fresco e fruttato e le sue bollicine vivaci. Perfetto per brindare o come aperitivo, il Prosecco è apprezzato in tutto il mondo per la sua versatilità e il suo prezzo accessibile. È un compagno ideale per feste e celebrazioni.', 
    './vini/prosecco.jpg');
    
    INSERT INTO wines (name, year, type, short_description, long_description, image) 
    VALUES ('Barolo', 2017, 'Rosso', 
    'Il Barolo è il re dei vini italiani.', 
    'Il Barolo è uno dei vini rossi più rinomati d Italia, prodotto nelle colline del Piemonte. Con il suo colore rosso rubino intenso e i profumi complessi di frutti di bosco e spezie, il Barolo è un vino robusto e strutturato, perfetto per accompagnare piatti di carne o formaggi stagionati. La sua eleganza e la sua complessità lo rendono adatto anche per l invecchiamento in cantina.', 
    './vini/barolo.jpg');
    
    INSERT INTO wines (name, year, type, short_description, long_description, image) 
    VALUES ('Amarone della Valpolicella', 2021, 'Rosso', 
    'L Amarone della Valpolicella è un vino rosso corposo e avvolgente.', 
    "L Amarone della Valpolicella è un vino rosso italiano unico e prezioso, prodotto nella regione della Valpolicella, nel Veneto. Con il suo gusto intenso e avvolgente e i profumi complessi di frutti rossi e spezie, l'Amarone è perfetto per occasioni speciali e piatti ricchi come arrosti o formaggi stagionati. È un vino che richiede pazienza e dedizione nella sua produzione, ma che ricompensa con una straordinaria esperienza gustativa.", 
    './vini/amarone.jpg');
  `);
}

setup().then(() => console.log('Database setup complete'));
