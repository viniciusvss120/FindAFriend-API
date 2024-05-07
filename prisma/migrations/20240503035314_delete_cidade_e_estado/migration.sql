/*
  Warnings:

  - You are about to drop the column `cidade_Id` on the `org` table. All the data in the column will be lost.
  - You are about to drop the column `cidadeId` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the `cidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estado` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cidade` to the `org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cidade" DROP CONSTRAINT "cidade_estado_Id_fkey";

-- DropForeignKey
ALTER TABLE "org" DROP CONSTRAINT "org_cidade_Id_fkey";

-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_cidadeId_fkey";

-- AlterTable
ALTER TABLE "org" DROP COLUMN "cidade_Id",
ADD COLUMN     "cidade" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pet" DROP COLUMN "cidadeId",
ADD COLUMN     "cidade" TEXT NOT NULL;

-- DropTable
DROP TABLE "cidade";

-- DropTable
DROP TABLE "estado";
