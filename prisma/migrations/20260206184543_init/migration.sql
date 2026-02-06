-- CreateTable
CREATE TABLE "PropBet" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "choiceA" TEXT NOT NULL,
    "choiceB" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "PropBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pick" (
    "id" SERIAL NOT NULL,
    "entryId" INTEGER NOT NULL,
    "propBetId" INTEGER NOT NULL,
    "selection" TEXT NOT NULL,

    CONSTRAINT "Pick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerKey" (
    "id" SERIAL NOT NULL,
    "propBetId" INTEGER NOT NULL,
    "correctChoice" TEXT NOT NULL,

    CONSTRAINT "AnswerKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropBet_order_key" ON "PropBet"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Pick_entryId_propBetId_key" ON "Pick"("entryId", "propBetId");

-- CreateIndex
CREATE UNIQUE INDEX "AnswerKey_propBetId_key" ON "AnswerKey"("propBetId");

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_propBetId_fkey" FOREIGN KEY ("propBetId") REFERENCES "PropBet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerKey" ADD CONSTRAINT "AnswerKey_propBetId_fkey" FOREIGN KEY ("propBetId") REFERENCES "PropBet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
