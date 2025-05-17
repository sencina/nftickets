-- Ensure Event table has name and description columns
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "name" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "description" TEXT NOT NULL DEFAULT '';

-- Add status field to tickets for usage tracking
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'AVAILABLE';

-- Add event date fields for better event management
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "start_date" TIMESTAMP(6);
ALTER TABLE "Event" ADD COLUMN IF NOT EXISTS "end_date" TIMESTAMP(6);

-- Add capacity field to sectors
ALTER TABLE "Sector" ADD COLUMN IF NOT EXISTS "capacity" INTEGER NOT NULL DEFAULT 0;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "Event_address_idx" ON "Event"("address");
CREATE INDEX IF NOT EXISTS "Sector_event_id_idx" ON "Sector"("event_id");
CREATE INDEX IF NOT EXISTS "Ticket_sector_id_idx" ON "Ticket"("sector_id");
CREATE INDEX IF NOT EXISTS "Ticket_status_idx" ON "Ticket"("status"); 