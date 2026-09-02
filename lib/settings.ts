import { prisma } from "@/lib/prisma";

export async function getSettings() {
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });
  if (!settings) throw new Error("Settings non initialises — lancez le seed (npm run db:seed)");
  return settings;
}

export async function getRealisations() {
  return prisma.realisation.findMany({ orderBy: { order: "asc" } });
}
