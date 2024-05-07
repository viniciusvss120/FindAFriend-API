/*
  Warnings:

  - The values [BAIXO,MEDIO,ALTO] on the enum `Nivel_Indep` will be removed. If these variants are still used in the database, this will fail.
  - The `porte_animal` column on the `Pet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Porte_animal" AS ENUM ('Pequenino', 'Medio', 'Grande');

-- AlterEnum
BEGIN;
CREATE TYPE "Nivel_Indep_new" AS ENUM ('Baixo', 'Medio', 'Alto');
ALTER TABLE "Pet" ALTER COLUMN "nivel_indep" DROP DEFAULT;
ALTER TABLE "Pet" ALTER COLUMN "nivel_indep" TYPE "Nivel_Indep_new" USING ("nivel_indep"::text::"Nivel_Indep_new");
ALTER TYPE "Nivel_Indep" RENAME TO "Nivel_Indep_old";
ALTER TYPE "Nivel_Indep_new" RENAME TO "Nivel_Indep";
DROP TYPE "Nivel_Indep_old";
ALTER TABLE "Pet" ALTER COLUMN "nivel_indep" SET DEFAULT 'Baixo';
COMMIT;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "porte_animal",
ADD COLUMN     "porte_animal" "Porte_animal" NOT NULL DEFAULT 'Medio',
ALTER COLUMN "nivel_indep" SET DEFAULT 'Baixo';
