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
    const messages = await sql`SELECT * FROM contacts`;
    const csvString = toCsv(messages);

    return new NextResponse(csvString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="messages.csv"',
      },
    });
  } catch (error) {
    console.error('Errore nel generare il file CSV:', error);
    return NextResponse.json({ error: 'Errore nel generare il file CSV' }, { status: 500 });
  }
}
