-- Add transfer strategy fields to Ticket table
ALTER TABLE IF EXISTS "Ticket" 
  ADD COLUMN IF NOT EXISTS "transfer_strategy_type" TEXT NOT NULL DEFAULT 'NORMAL',
  ADD COLUMN IF NOT EXISTS "transfer_strategy_data" JSONB; 