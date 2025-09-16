import { query } from '@/lib/db';

export async function DELETE(request, { params }) {
  const { id } = params;

  await query('DELETE FROM transactions WHERE id = $1', [id]);

  return new Response('Transaction deleted', { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { type, amount, category, description } = await request.json();

  const result = await query(
    'UPDATE transactions SET type = $1, amount = $2, category = $3, description = $4 WHERE id = $5 RETURNING *',
    [type, amount, category, description, id]
  );

  return new Response(JSON.stringify(result.rows[0]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}