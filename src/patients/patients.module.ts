import { Module } from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { PatientsController } from "./patients.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileModule } from "src/file/file.module";

@Module({
controllers : [PatientsController],
providers: [PatientsService], 
imports : [PrismaModule, FileModule]
})
export class PatientsModule{}