import { Body, Controller, Post, Put  } from "@nestjs/common";
import { UsersCreateDTO } from "src/users/dto/users-create.dto";
import { UsersService } from "./users.service";
import { UsersUpdateDTO } from "./dto/users-update.dto";
import { UserId } from "src/decorators/user-id.decorator";
@Controller('users')
export class UsersController{

    constructor(
        private readonly usersService : UsersService
    ){}

    @Post()
    async create(@Body() {name, email, office, password} : UsersCreateDTO){

        return await this.usersService.create({name, email, office, password});
        
    }

    @Put()
    async update(@Body() {name, email, office, password, old_password} : UsersUpdateDTO, @UserId() user_id : number){
        return await this.usersService.update({name, email, office, password, old_password, user_id})
    }
}