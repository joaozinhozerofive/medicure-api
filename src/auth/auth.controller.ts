import { Body, Controller, Post } from "@nestjs/common";
import { AuthCreateDTO } from "./dto/auth-create.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor( private readonly authService : AuthService){}

    @Post()
    async create(@Body() {email, password} : AuthCreateDTO){

        return await this.authService.create({email, password})
    }
}