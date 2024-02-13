import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersService } from "./users.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService], 
    exports: [UsersService],
    imports: [PrismaModule]
})
export class UsersModule{}