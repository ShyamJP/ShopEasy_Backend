/*
  Warnings:

  - Made the column `serviceId` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "serviceId" SET NOT NULL;
