/*
  Warnings:

  - You are about to drop the `AppSecurity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AppSecurity";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "JsonBinConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "masterKey" TEXT,
    "binId" TEXT,
    "lastSyncAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);
