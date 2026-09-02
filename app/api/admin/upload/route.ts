import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadPhoto } from "@/lib/blob";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Le fichier doit être une image" }, { status: 400 });
  }

  try {
    const url = await uploadPhoto(file, "lots");
    return NextResponse.json({ url });
  } catch (e) {
    console.error("upload failed", e);
    const message = e instanceof Error ? e.message : "Envoi impossible";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
