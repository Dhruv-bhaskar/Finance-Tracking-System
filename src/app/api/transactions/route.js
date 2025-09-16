import { query } from '@/lib/db';

export async function GET() {
  const result = await query('SELECT * FROM transactions ORDER BY date DESC');
  
  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}