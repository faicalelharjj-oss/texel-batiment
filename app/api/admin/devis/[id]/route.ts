import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.devisRequest.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
