import crypto from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8; // 8 heures

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET manquant dans .env");
  return secret;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSessionToken(email: string) {
  const expires = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = Buffer.from(JSON.stringify({ email, expires })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): { email: string } | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSig = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.expires !== "number" || Date.now() > data.expires) return null;
    if (typeof data.email !== "string") return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

export function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
