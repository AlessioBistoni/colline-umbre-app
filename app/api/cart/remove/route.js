import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { userId, wineId } = await request.json();

  try {
    const sql = getSql();
    await sql`DELETE FROM cart WHERE user_id = ${userId} AND wine_id = ${wineId}`;
    return NextResponse.json({ message: 'Elemento rimosso dal carrello' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante la rimozione dell'elemento dal carrello:", error);
    return NextResponse.json({ error: "Errore durante la rimozione dell'elemento dal carrello" }, { status: 500 });
  }
}
