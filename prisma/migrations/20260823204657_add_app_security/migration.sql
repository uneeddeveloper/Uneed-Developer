-- CreateTable
CREATE TABLE "AppSecurity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "masterKeyHash" TEXT,
    "updatedAt" DATETIME NOT NULL
);
