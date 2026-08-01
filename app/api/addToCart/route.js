import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { userId, wineId } = await request.json();

  try {
    const sql = getSql();
    const existing = await sql`SELECT * FROM cart WHERE user_id = ${userId} AND wine_id = ${wineId}`;

    if (existing[0]) {
      await sql`UPDATE cart SET quantity = quantity + 1 WHERE user_id = ${userId} AND wine_id = ${wineId}`;
    } else {
      await sql`INSERT INTO cart (user_id, wine_id, quantity) VALUES (${userId}, ${wineId}, 1)`;
    }

    return NextResponse.json({ message: 'Vino aggiunto al carrello con successo' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'aggiunta al carrello:", error);
    return NextResponse.json({ error: "Errore durante l'aggiunta al carrello" }, { status: 500 });
  }
}
