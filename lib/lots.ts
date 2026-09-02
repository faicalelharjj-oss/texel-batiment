import { prisma } from "@/lib/prisma";

export function getLots() {
  return prisma.lot.findMany({
    orderBy: { order: "asc" },
    include: { gallery: { orderBy: { order: "asc" } } },
  });
}

export function getLotBySlug(slug: string) {
  return prisma.lot.findUnique({
    where: { slug },
    include: { gallery: { orderBy: { order: "asc" } } },
  });
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}
