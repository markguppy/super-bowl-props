-- CreateTable
CREATE TABLE "PropBet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "topic" TEXT NOT NULL,
    "choiceA" TEXT NOT NULL,
    "choiceB" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Pick" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryId" INTEGER NOT NULL,
    "propBetId" INTEGER NOT NULL,
    "selection" TEXT NOT NULL,
    CONSTRAINT "Pick_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pick_propBetId_fkey" FOREIGN KEY ("propBetId") REFERENCES "PropBet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnswerKey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "propBetId" INTEGER NOT NULL,
    "correctChoice" TEXT NOT NULL,
    CONSTRAINT "AnswerKey_propBetId_fkey" FOREIGN KEY ("propBetId") REFERENCES "PropBet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PropBet_order_key" ON "PropBet"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Pick_entryId_propBetId_key" ON "Pick"("entryId", "propBetId");

-- CreateIndex
CREATE UNIQUE INDEX "AnswerKey_propBetId_key" ON "AnswerKey"("propBetId");
