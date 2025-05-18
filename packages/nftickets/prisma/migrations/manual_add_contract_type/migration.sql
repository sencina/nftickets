-- Add contract_type column to Event table
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "contract_type" TEXT NOT NULL DEFAULT 'NFTicket1155'; 