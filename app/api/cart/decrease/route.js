import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { userId, wineId } = await request.json();

  try {
    const sql = getSql();
    await sql`UPDATE cart SET quantity = quantity - 1 WHERE user_id = ${userId} AND wine_id = ${wineId}`;

    const rows = await sql`SELECT quantity FROM cart WHERE user_id = ${userId} AND wine_id = ${wineId}`;

    if (rows[0] && rows[0].quantity === 0) {
      await sql`DELETE FROM cart WHERE user_id = ${userId} AND wine_id = ${wineId}`;
      return NextResponse.json({ message: 'Vino rimosso dal carrello' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Quantità diminuita con successo' }, { status: 200 });
  } catch (error) {
    console.error('Errore durante la diminuzione della quantità:', error);
    return NextResponse.json({ error: 'Errore durante la diminuzione della quantità' }, { status: 500 });
  }
}
