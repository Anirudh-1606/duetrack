import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://yunfvnyapmgnsbtbynzd.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, businessType, source } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save to Supabase
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        phone: phone || null,
        business_type: businessType || null,
        source: source || "landing",
        created_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase error:", text);
      // Still return success to user — don't block UX on DB errors
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ success: true }); // graceful degradation
  }
}
