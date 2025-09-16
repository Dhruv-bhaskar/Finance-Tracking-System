import {query} from '@/lib/db'

export async function POST(request) {
    const {type, amount, category, description} = await request.json()

    const result = await query(
        'INSERT INTO transactions (type, amount, category, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [type, amount, category, description]
    )

    return new Response(JSON.stringify(result.rows[0]), {status: 201})
}