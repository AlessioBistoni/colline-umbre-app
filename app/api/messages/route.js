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
    const messages = await sql`SELECT * FROM contacts`;
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Errore nel recupero dei messaggi' }, { status: 500 });
  }
}

export async function DELETE() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  try {
    const sql = getSql();
    await sql`DELETE FROM contacts`;
    return NextResponse.json({ message: 'Tutti i messaggi sono stati eliminati con successo' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'eliminazione di tutti i messaggi:", error);
    return NextResponse.json({ error: "Errore durante l'eliminazione di tutti i messaggi" }, { status: 500 });
  }
}
