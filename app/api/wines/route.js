import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getSql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = getSql();
    const wines = await sql`SELECT * FROM wines`;
    return NextResponse.json(wines, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Errore nel recupero dei vini' }, { status: 500 });
  }
}

export async function POST(request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const price = formData.get('price');
    const year = formData.get('year');
    const type = formData.get('type');
    const short_description = formData.get('short_description');
    const long_description = formData.get('long_description');
    const file = formData.get('image');

    const sql = getSql();
    const [wine] = await sql`
      INSERT INTO wines (name, price, year, type, short_description, long_description)
      VALUES (${name}, ${price}, ${year}, ${type}, ${short_description}, ${long_description})
      RETURNING id
    `;

    const blob = await put(`viniShop/${wine.id}-${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    await sql`UPDATE wines SET image = ${blob.url} WHERE id = ${wine.id}`;

    return NextResponse.json({ message: 'Vino aggiunto con successo' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'aggiunta del vino:", error);
    return NextResponse.json({ error: "Errore durante l'aggiunta del vino" }, { status: 500 });
  }
}
