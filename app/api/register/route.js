import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { email, password, nome, cognome } = await request.json();

  if (!email || !password || !nome || !cognome) {
    return NextResponse.json({ message: 'Tutti i campi sono obbligatori' }, { status: 400 });
  }

  try {
    const sql = getSql();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await sql`
      INSERT INTO users (email, password, nome, cognome)
      VALUES (${email}, ${hashedPassword}, ${nome}, ${cognome})
      RETURNING id, email, nome, cognome, admin
    `;

    return NextResponse.json(
      { message: 'Registrazione riuscita', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    return NextResponse.json({ message: 'Errore durante la registrazione' }, { status: 500 });
  }
}
