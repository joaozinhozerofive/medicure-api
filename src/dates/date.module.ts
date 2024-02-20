import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DateService } from "./date.service";
import { DateController } from "./date.controller";

@Module({
controllers: [DateController],
exports : [DateService],
imports : [PrismaModule], 
providers : [DateService],
})
export class DateModule{}