/*
  Warnings:

  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pet";

-- CreateTable
CREATE TABLE "pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "nivel_energia" INTEGER NOT NULL,
    "porte_animal" "Porte_animal" NOT NULL DEFAULT 'Medio',
    "nivel_indep" "Nivel_Indep" NOT NULL DEFAULT 'Baixo',
    "cidadeId" TEXT NOT NULL,
    "org_Id" TEXT NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "estado_Id" TEXT NOT NULL,

    CONSTRAINT "cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "whatsapp" INTEGER NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade_Id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "org_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "org_email_key" ON "org"("email");

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_org_Id_fkey" FOREIGN KEY ("org_Id") REFERENCES "org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidade" ADD CONSTRAINT "cidade_estado_Id_fkey" FOREIGN KEY ("estado_Id") REFERENCES "estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "org" ADD CONSTRAINT "org_cidade_Id_fkey" FOREIGN KEY ("cidade_Id") REFERENCES "cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
