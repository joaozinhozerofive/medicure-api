import { Module } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileModule } from "src/file/file.module";

@Module({
controllers : [DoctorsController],
providers: [DoctorsService], 
imports : [PrismaModule, FileModule]
})
export class DoctorsModule{}