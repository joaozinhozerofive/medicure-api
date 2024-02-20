import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConsultationsController } from "./consultations.controller";
import { ConsultationsService } from "./consultations.service";

@Module({
    imports :[PrismaModule], 
    exports : [ConsultationsService], 
    providers : [ConsultationsService], 
    controllers : [ConsultationsController]
})

export class ConsultationsModule{}