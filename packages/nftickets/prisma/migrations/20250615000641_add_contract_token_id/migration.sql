/*
  Warnings:

  - You are about to drop the column `status` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Sector_contract_sector_id_idx";

-- DropIndex
DROP INDEX "Ticket_status_idx";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "status",
ADD COLUMN     "contract_token_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "transfer_strategy_data" JSONB,
ADD COLUMN     "transfer_strategy_type" TEXT NOT NULL DEFAULT 'NORMAL';

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE INDEX "ApiKey_wallet_address_idx" ON "ApiKey"("wallet_address");
