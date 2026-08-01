import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  try {
    const sql = getSql();
    const users = await sql`SELECT nome, cognome, email, id, admin FROM users`;
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error);
    return NextResponse.json({ error: 'Errore nel recupero degli utenti' }, { status: 500 });
  }
}
