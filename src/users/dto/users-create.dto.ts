import {IsEmail, IsString, MinLength} from 'class-validator'

export class UsersCreateDTO {
    @IsString()
    name : string;

    @IsEmail({})
    email : string;

    @IsString()
    office : string

    @IsString()
    @MinLength(6)
    password : string;
}