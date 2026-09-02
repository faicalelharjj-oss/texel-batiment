-- CreateTable
CREATE TABLE "Lot" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "lead" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "heroPhoto" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LotPhoto" (
    "id" TEXT NOT NULL,
    "lotId" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LotPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "phoneDisplay" TEXT NOT NULL,
    "phoneIntl" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "defaultWaMessage" TEXT NOT NULL,
    "heroEyebrow" TEXT NOT NULL,
    "heroTagline" TEXT NOT NULL,
    "heroLead" TEXT NOT NULL,
    "heroExpertise" TEXT[],
    "heroPhoto" TEXT NOT NULL,
    "whyTitle" TEXT NOT NULL,
    "whyPhoto" TEXT NOT NULL,
    "whyList" TEXT[],
    "showcasePhoto" TEXT NOT NULL,
    "showcaseTitle" TEXT NOT NULL,
    "showcaseText" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Realisation" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "photo" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "caption" TEXT NOT NULL,

    CONSTRAINT "Realisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevisRequest" (
    "id" TEXT NOT NULL,
    "lot" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DevisRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lot_slug_key" ON "Lot"("slug");

-- AddForeignKey
ALTER TABLE "LotPhoto" ADD CONSTRAINT "LotPhoto_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
