-- CreateTable
CREATE TABLE "Scan" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "token_id" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "scanner_address" TEXT,
    "ticket_owner" TEXT,
    "sector_name" TEXT,
    "scan_result" TEXT NOT NULL DEFAULT 'SUCCESS',
    "error_code" TEXT,
    "scanned_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location_info" JSONB,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Scan_event_id_idx" ON "Scan"("event_id");

-- CreateIndex
CREATE INDEX "Scan_scanned_at_idx" ON "Scan"("scanned_at");

-- CreateIndex
CREATE INDEX "Scan_scan_result_idx" ON "Scan"("scan_result");

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
