import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { userId } = await params;

  try {
    const sql = getSql();
    const cartItems = await sql`
      SELECT cart.id, wines.id AS wine_id, wines.name, wines.price, cart.quantity
      FROM cart
      JOIN wines ON cart.wine_id = wines.id
      WHERE cart.user_id = ${userId}
    `;
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error('Errore nel recupero del carrello:', error);
    return NextResponse.json({ error: 'Errore nel recupero del carrello' }, { status: 500 });
  }
}
