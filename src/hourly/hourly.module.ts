import { Module } from "@nestjs/common";
import { HourlyController } from "./hourly.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { HourlyService } from "./hourly.service";

@Module({
    imports:  [PrismaModule],
    exports:  [HourlyService],
    providers:  [HourlyService],
    controllers:  [HourlyController],

})
export class HourlyModule{}