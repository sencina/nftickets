-- Drop the index on the status column
DROP INDEX IF EXISTS "Ticket_status_idx";

-- Rename status column to contract_token_id with a new default value
ALTER TABLE "Ticket" 
    DROP COLUMN IF EXISTS "status",
    ADD COLUMN "contract_token_id" TEXT NOT NULL DEFAULT ''; 