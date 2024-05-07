-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "nivel_energia" INTEGER NOT NULL,
    "porte_animal" TEXT NOT NULL,
    "nivel_indep" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);
