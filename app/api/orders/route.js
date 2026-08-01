import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { userId, cartItems } = await request.json();

  try {
    const sql = getSql();
    const currentDate = new Date().toISOString().slice(0, 10);

    let totalAmount = 0.0;
    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
    }

    const [order] = await sql`
      INSERT INTO orders (user_id, order_date, total_amount)
      VALUES (${userId}, ${currentDate}, ${totalAmount})
      RETURNING id
    `;

    for (const item of cartItems) {
      await sql`
        INSERT INTO order_details (order_id, wine_id, quantity, price_per_unit)
        VALUES (${order.id}, ${item.wine_id}, ${item.quantity}, ${item.price})
      `;
    }

    await sql`DELETE FROM cart WHERE user_id = ${userId}`;

    return NextResponse.json({ message: 'Ordine completato con successo' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante la creazione dell'ordine:", error);
    return NextResponse.json({ error: "Errore durante la creazione dell'ordine" }, { status: 500 });
  }
}
