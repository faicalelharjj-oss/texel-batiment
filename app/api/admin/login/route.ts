import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_MAX_AGE, createSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    return NextResponse.json({ error: "Compte administrateur non configuré (voir .env)" }, { status: 500 });
  }

  if (!email || !password || email.toLowerCase() !== adminEmail.toLowerCase()) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, adminHash);
  if (!valid) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(adminEmail), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
