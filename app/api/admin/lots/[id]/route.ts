import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  const lot = await prisma.lot.findUnique({ where: { id }, include: { gallery: { orderBy: { order: "asc" } } } });
  if (!lot) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({ lot });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });

  const gallery = Array.isArray(body.gallery)
    ? body.gallery
        .filter((g: unknown): g is { src: string; alt: string } => {
          const item = g as { src?: unknown; alt?: unknown } | null;
          return !!item && typeof item.src === "string" && item.src.trim().length > 0;
        })
        .map((g: { src: string; alt: string }, i: number) => ({
          src: g.src,
          alt: typeof g.alt === "string" ? g.alt : "",
          order: i,
        }))
    : undefined;

  try {
    const lot = await prisma.lot.update({
      where: { id },
      data: {
        ...(typeof body.title === "string" ? { title: body.title.trim() } : {}),
        ...(typeof body.lead === "string" ? { lead: body.lead } : {}),
        ...(typeof body.metaDescription === "string" ? { metaDescription: body.metaDescription } : {}),
        ...(typeof body.heroPhoto === "string" ? { heroPhoto: body.heroPhoto } : {}),
        ...(typeof body.order === "number" ? { order: Math.round(body.order) } : {}),
        ...(gallery
          ? {
              gallery: {
                deleteMany: {},
                create: gallery,
              },
            }
          : {}),
      },
      include: { gallery: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json({ lot });
  } catch (e) {
    console.error("lot update failed", e);
    return NextResponse.json({ error: "Mise à jour impossible" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.lot.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
