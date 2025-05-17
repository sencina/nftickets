-- Create Event table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Event" (
  "id" UUID NOT NULL,
  "address" TEXT NOT NULL,
  "metadata_hash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- Update Event table if it already exists
ALTER TABLE IF EXISTS "Event" 
  ADD COLUMN IF NOT EXISTS "address" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "metadata_hash" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "name" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "description" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable for Sector
CREATE TABLE IF NOT EXISTS "Sector" (
  "id" UUID NOT NULL,
  "event_id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable for Ticket
CREATE TABLE IF NOT EXISTS "Ticket" (
  "id" UUID NOT NULL,
  "sector_id" UUID NOT NULL,
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE; 