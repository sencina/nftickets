-- Add contract_sector_id field to Sector table for blockchain sector ID tracking
ALTER TABLE "Sector" ADD COLUMN IF NOT EXISTS "contract_sector_id" INTEGER NOT NULL DEFAULT 0;

-- Create an index for better query performance on contract_sector_id
CREATE INDEX IF NOT EXISTS "Sector_contract_sector_id_idx" ON "Sector"("contract_sector_id"); 