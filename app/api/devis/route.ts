import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lot = typeof body?.lot === "string" ? body.lot.trim() : "";
  const nom = typeof body?.nom === "string" ? body.nom.trim() : "";
  const telephone = typeof body?.telephone === "string" ? body.telephone.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!lot || !nom || !telephone) {
    return NextResponse.json({ error: "Champs requis manquants (lot, nom, telephone)." }, { status: 400 });
  }

  try {
    const devis = await prisma.devisRequest.create({
      data: {
        lot: lot.slice(0, 200),
        nom: nom.slice(0, 200),
        telephone: telephone.slice(0, 50),
        message: message ? message.slice(0, 2000) : null,
      },
    });
    return NextResponse.json({ ok: true, id: devis.id });
  } catch (e) {
    console.error("devis create failed", e);
    return NextResponse.json({ error: "Impossible d'enregistrer la demande." }, { status: 500 });
  }
}
