import { Body, Controller, Post } from "@nestjs/common";
import { UsersCreateDTO } from "src/users/dto/users-create.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{

    constructor(
        private readonly usersService : UsersService
    ){}

    @Post()
    async create(@Body() {name, email, office, password} : UsersCreateDTO){

        return await this.usersService.create({name, email, office, password});
        
    }
}