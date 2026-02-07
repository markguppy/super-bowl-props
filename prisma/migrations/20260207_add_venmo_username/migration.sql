-- AlterTable
ALTER TABLE "Entry" ADD COLUMN "venmoUsername" TEXT NOT NULL DEFAULT 'unknown';

-- Remove the default after backfilling
ALTER TABLE "Entry" ALTER COLUMN "venmoUsername" DROP DEFAULT;
