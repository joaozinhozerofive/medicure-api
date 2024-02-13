import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";


@Module({
    controllers : [AuthController], 
    exports:[AuthService], 
    imports: [PrismaModule],
    providers: [AuthService]
})
export class AuthModule{}