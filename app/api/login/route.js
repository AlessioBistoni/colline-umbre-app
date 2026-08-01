import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const sql = getSql();
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _password, ...userWithoutPassword } = user;
      return NextResponse.json(
        { message: 'Login riuscito', user: userWithoutPassword },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: 'Credenziali non valide' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Errore durante il login' }, { status: 500 });
  }
}
