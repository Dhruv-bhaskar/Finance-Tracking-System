import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { query } from "@/lib/db";

export async function PUT(request, { params }) {
const cookieStore = await cookies(); // ✅ must await
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, amount, category, description } = await request.json();

  const result = await query(
    `UPDATE transactions
     SET type = $1, amount = $2, category = $3, description = $4
     WHERE id = $5 AND user_id = $6
     RETURNING *`,
    [type, amount, category, description, params.id, user.id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Not found or not allowed" },
      { status: 404 }
    );
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(request, { params }) {
  const cookieStore = await cookies(); // ✅ must await
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await query(
    "DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *",
    [params.id, user.id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Not found or not allowed" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
