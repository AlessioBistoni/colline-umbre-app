import { openDB } from '../database';

export default async function handler(req, res) {
  const db = await openDB();
  const users = await db.all('SELECT * FROM users'); // Esegui una query di esempio
  res.status(200).json(users);
}