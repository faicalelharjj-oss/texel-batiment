import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/lots";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const lots = await prisma.lot.findMany({ orderBy: { order: "asc" }, include: { gallery: true } });
  return NextResponse.json({ lots });
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "Le titre est requis" }, { status: 400 });

  const baseSlug = slugify(title) || "lot";
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.lot.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const maxOrder = await prisma.lot.aggregate({ _max: { order: true } });

  const lot = await prisma.lot.create({
    data: {
      slug,
      title,
      order: (maxOrder._max.order ?? 0) + 1,
      lead: typeof body?.lead === "string" ? body.lead : "",
      metaDescription: typeof body?.metaDescription === "string" ? body.metaDescription : "",
      heroPhoto: typeof body?.heroPhoto === "string" ? body.heroPhoto : "/images/hero.jpg",
      icon: '<rect x="8" y="8" width="24" height="24"></rect>',
    },
  });

  return NextResponse.json({ lot });
}
