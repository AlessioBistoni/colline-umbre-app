import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { toCsv } from '@/lib/csv';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  try {
    const sql = getSql();
    const users = await sql`SELECT nome, cognome, email FROM users`;
    const csvString = toCsv(users);

    return new NextResponse(csvString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="users.csv"',
      },
    });
  } catch (error) {
    console.error('Errore nel generare il file CSV:', error);
    return NextResponse.json({ error: 'Errore nel generare il file CSV' }, { status: 500 });
  }
}
