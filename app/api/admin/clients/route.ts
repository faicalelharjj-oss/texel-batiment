import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const clients = await prisma.client.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ clients });
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const logo = typeof body?.logo === "string" ? body.logo.trim() : "";
  if (!name || !logo) {
    return NextResponse.json({ error: "Nom et logo requis" }, { status: 400 });
  }

  const maxOrder = await prisma.client.aggregate({ _max: { order: true } });
  const client = await prisma.client.create({
    data: { name, logo, order: (maxOrder._max.order ?? 0) + 1 },
  });
  return NextResponse.json({ client });
}
