/*
  Warnings:

  - Added the required column `creator_wallet_address` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: Add column with default value for existing records
ALTER TABLE "Event" ADD COLUMN "creator_wallet_address" TEXT NOT NULL DEFAULT 'unknown';

-- Update existing records with a placeholder value (you may want to update these manually later)
UPDATE "Event" SET "creator_wallet_address" = 'legacy_event_creator' WHERE "creator_wallet_address" = 'unknown';

-- CreateIndex
CREATE INDEX "Event_creator_wallet_address_idx" ON "Event"("creator_wallet_address");
