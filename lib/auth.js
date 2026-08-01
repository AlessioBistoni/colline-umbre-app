import { cookies } from 'next/headers';
import { getSql } from './db';

export async function requireAdmin() {
  const cookieStore = await cookies();
  const raw = cookieStore.get('user')?.value;
  if (!raw) return null;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  const sql = getSql();
  const rows = await sql`SELECT id, admin FROM users WHERE id = ${parsed.id}`;
  const user = rows[0];
  if (!user || !user.admin) return null;
  return user;
}
