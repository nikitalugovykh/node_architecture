/*
  Warnings:

  - Added the required column `fio` to the `UserModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "fio" TEXT NOT NULL;
