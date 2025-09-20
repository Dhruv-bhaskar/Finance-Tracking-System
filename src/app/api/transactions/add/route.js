import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function POST(request) {
  // ✅ Await cookies()
  const cookieStore = await cookies();

  // ✅ Pass the cookie store
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, amount, category, description } = await request.json();

  const result = await query(
    "INSERT INTO transactions (user_id, type, amount, category, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [user.id, type, amount, category, description] // ✅ also store user_id for RLS
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
