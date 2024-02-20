-- DropForeignKey
ALTER TABLE "hourly" DROP CONSTRAINT "hourly_date_id_fkey";

-- AddForeignKey
ALTER TABLE "hourly" ADD CONSTRAINT "hourly_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
