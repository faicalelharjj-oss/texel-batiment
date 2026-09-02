import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const STRING_FIELDS = [
  "companyName",
  "phoneDisplay",
  "phoneIntl",
  "whatsappNumber",
  "email",
  "defaultWaMessage",
  "heroEyebrow",
  "heroTagline",
  "heroLead",
  "heroPhoto",
  "whyTitle",
  "whyPhoto",
  "showcasePhoto",
  "showcaseTitle",
  "showcaseText",
] as const;

export async function PATCH(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });

  const data: Record<string, string | string[]> = {};
  for (const field of STRING_FIELDS) {
    if (typeof body[field] === "string") data[field] = body[field];
  }
  if (Array.isArray(body.heroExpertise)) {
    data.heroExpertise = body.heroExpertise.filter((s: unknown) => typeof s === "string" && s.trim());
  }
  if (Array.isArray(body.whyList)) {
    data.whyList = body.whyList.filter((s: unknown) => typeof s === "string" && s.trim());
  }

  try {
    const settings = await prisma.settings.update({ where: { id: 1 }, data });

    if (Array.isArray(body.realisations)) {
      await prisma.realisation.deleteMany({});
      const items = body.realisations.filter(
        (r: unknown): r is { photo: string; tag: string; caption: string } => {
          const item = r as { photo?: unknown } | null;
          return !!item && typeof item.photo === "string" && item.photo.trim().length > 0;
        }
      );
      if (items.length) {
        await prisma.realisation.createMany({
          data: items.map((r: { photo: string; tag: string; caption: string }, i: number) => ({
            order: i,
            photo: r.photo,
            tag: typeof r.tag === "string" ? r.tag : "",
            caption: typeof r.caption === "string" ? r.caption : "",
          })),
        });
      }
    }

    return NextResponse.json({ settings });
  } catch (e) {
    console.error("settings update failed", e);
    return NextResponse.json({ error: "Mise à jour impossible" }, { status: 500 });
  }
}
