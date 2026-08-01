import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const sql = getSql();
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentTime = new Date().toLocaleTimeString();

    await sql`
      INSERT INTO contacts (name, email, message, sent_date, sent_time)
      VALUES (${name}, ${email}, ${message}, ${currentDate}, ${currentTime})
    `;

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'invio del messaggio:", error);
    return NextResponse.json({ error: "Errore durante l'invio del messaggio" }, { status: 500 });
  }
}
