import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });

  try {
    const client = await prisma.client.update({
      where: { id },
      data: {
        ...(typeof body.name === "string" ? { name: body.name.trim() } : {}),
        ...(typeof body.logo === "string" ? { logo: body.logo } : {}),
        ...(typeof body.order === "number" ? { order: Math.round(body.order) } : {}),
      },
    });
    return NextResponse.json({ client });
  } catch (e) {
    console.error("client update failed", e);
    return NextResponse.json({ error: "Mise à jour impossible" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.client.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
