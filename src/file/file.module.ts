import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileController } from "./file.controller";

@Module({
    controllers : [FileController],
    exports : [FileService], 
    providers: [FileService], 
    imports : [PrismaModule]
})

export class FileModule{}