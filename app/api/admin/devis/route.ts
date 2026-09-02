import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const requests = await prisma.devisRequest.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return NextResponse.json({ requests });
}
