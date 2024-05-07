/*
  Warnings:

  - The `nivel_indep` column on the `Pet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Nivel_Indep" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "nivel_indep",
ADD COLUMN     "nivel_indep" "Nivel_Indep" NOT NULL DEFAULT 'BAIXO';
