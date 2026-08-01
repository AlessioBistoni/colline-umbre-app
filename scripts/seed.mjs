import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs';
import { Client } from '@neondatabase/serverless';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();

  const schema = readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
  await client.query(schema);

  const { rows: wineRows } = await client.query('SELECT COUNT(*) FROM wines');
  if (Number(wineRows[0].count) === 0) {
    await client.query(`
      INSERT INTO wines (name, price, year, type, short_description, long_description, image)
      VALUES
        ('Chianti Classico', 10.0, 2018, 'Rosso', 'Il Chianti Classico è un icona dei vini italiani.', 'Il Chianti Classico è uno dei vini più celebri e apprezzati della Toscana. Prodotto nella regione del Chianti, è noto per il suo gusto robusto e il caratteristico aroma di ciliegia. Questo vino rosso è perfetto per accompagnare piatti di carne o formaggi stagionati. Ha una storia antica e una tradizione che si tramanda da secoli.', '/viniShop/Chianti.jpg'),
        ('Pinot Grigio', 20.0, 2019, 'Bianco', 'Il Pinot Grigio è un vino fresco e fruttato.', 'Il Pinot Grigio è un vino bianco leggero e fresco, originario della regione del Veneto. Con il suo profumo fruttato e il gusto fresco e vivace, è l accompagnamento perfetto per piatti a base di pesce o antipasti leggeri. È apprezzato per la sua versatilità e la sua facilità di abbinamento con una varietà di piatti.', '/viniShop/Pinot.jpg'),
        ('Prosecco', 15.0, 2020, 'Spumante', 'Il Prosecco è uno spumante italiano frizzante e versatile.', 'Il Prosecco è un vino spumante italiano famoso per il suo gusto fresco e fruttato e le sue bollicine vivaci. Perfetto per brindare o come aperitivo, il Prosecco è apprezzato in tutto il mondo per la sua versatilità e il suo prezzo accessibile. È un compagno ideale per feste e celebrazioni.', '/viniShop/Prosecco.jpg'),
        ('Barolo', 20.0, 2017, 'Rosso', 'Il Barolo è il re dei vini italiani.', 'Il Barolo è uno dei vini rossi più rinomati d Italia, prodotto nelle colline del Piemonte. Con il suo colore rosso rubino intenso e i profumi complessi di frutti di bosco e spezie, il Barolo è un vino robusto e strutturato, perfetto per accompagnare piatti di carne o formaggi stagionati. La sua eleganza e la sua complessità lo rendono adatto anche per l invecchiamento in cantina.', '/viniShop/Barolo.jpg'),
        ('Amarone della Valpolicella', 30.0, 2021, 'Rosso', 'L Amarone della Valpolicella è un vino rosso corposo e avvolgente.', 'L Amarone della Valpolicella è un vino rosso italiano unico e prezioso, prodotto nella regione della Valpolicella, nel Veneto. Con il suo gusto intenso e avvolgente e i profumi complessi di frutti rossi e spezie, l Amarone è perfetto per occasioni speciali e piatti ricchi come arrosti o formaggi stagionati. È un vino che richiede pazienza e dedizione nella sua produzione, ma che ricompensa con una straordinaria esperienza gustativa.', '/viniShop/Amarone.jpg');
    `);
    console.log('Seeded wines');
  }

  const { rows: userRows } = await client.query('SELECT COUNT(*) FROM users');
  if (Number(userRows[0].count) === 0) {
    const hash1 = await bcrypt.hash('password123', 10);
    const hash2 = await bcrypt.hash('password456', 10);
    const { rows: insertedUsers } = await client.query(
      `INSERT INTO users (email, password, nome, cognome, admin) VALUES
        ($1, $2, 'Mario', 'Rossi', true),
        ($3, $4, 'Luigi', 'Verdi', false)
       RETURNING id`,
      ['test@example.com', hash1, 'example@test.com', hash2]
    );
    console.log('Seeded users');

    const { rows: wines } = await client.query('SELECT id FROM wines ORDER BY id LIMIT 2');
    if (wines.length === 2) {
      await client.query(
        `INSERT INTO cart (user_id, wine_id, quantity) VALUES ($1, $2, 1), ($1, $3, 2)`,
        [insertedUsers[0].id, wines[0].id, wines[1].id]
      );
      console.log('Seeded cart');
    }
  }

  await client.end();
  console.log('Seed complete');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
