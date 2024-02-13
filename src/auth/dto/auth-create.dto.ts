import { IsEmail, IsString, MinLength } from "class-validator";


export class AuthCreateDTO{
    @IsEmail()
    @IsString()
    email : string


    @IsString()
    @MinLength(6)
    password : string
}