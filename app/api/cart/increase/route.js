import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { userId, wineId } = await request.json();

  try {
    const sql = getSql();
    await sql`UPDATE cart SET quantity = quantity + 1 WHERE user_id = ${userId} AND wine_id = ${wineId}`;
    return NextResponse.json({ message: 'Quantità aumentata con successo' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'aggiornamento della quantità:", error);
    return NextResponse.json({ error: "Errore durante l'aggiornamento della quantità" }, { status: 500 });
  }
}
