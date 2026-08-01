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
    const orders = await sql`
      SELECT o.*, u.nome, u.cognome, u.email
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `;

    for (const order of orders) {
      order.order_details = await sql`
        SELECT od.id, od.quantity, od.price_per_unit, w.name
        FROM order_details od
        JOIN wines w ON od.wine_id = w.id
        WHERE od.order_id = ${order.id}
      `;
    }

    const csvContent = toCsv(orders.map((o) => ({ ...o, order_details: JSON.stringify(o.order_details) })));

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="orders.csv"',
      },
    });
  } catch (error) {
    console.error('Errore durante la generazione del CSV:', error);
    return NextResponse.json({ error: 'Errore durante la generazione del CSV' }, { status: 500 });
  }
}
