import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const sql = getSql();
    await sql`DELETE FROM wines WHERE id = ${id}`;
    return NextResponse.json({ message: 'Vino eliminato con successo' }, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'eliminazione del vino:", error);
    return NextResponse.json({ error: "Errore durante l'eliminazione del vino" }, { status: 500 });
  }
}
