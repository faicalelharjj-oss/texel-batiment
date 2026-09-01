import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../lib/prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { lot, nom, telephone, message } = req.body || {};

  if (!lot || !nom || !telephone) {
    res.status(400).json({ error: "Champs requis manquants (lot, nom, telephone)." });
    return;
  }

  try {
    const devis = await prisma.devisRequest.create({
      data: {
        lot: String(lot).slice(0, 200),
        nom: String(nom).slice(0, 200),
        telephone: String(telephone).slice(0, 50),
        message: message ? String(message).slice(0, 2000) : null,
      },
    });
    res.status(200).json({ ok: true, id: devis.id });
  } catch (e) {
    console.error("devis create failed", e);
    res.status(500).json({ error: "Impossible d'enregistrer la demande." });
  }
}
