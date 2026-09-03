-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
