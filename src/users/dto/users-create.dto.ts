import {IsEmail, IsString, MinLength} from 'class-validator'

export class UsersCreateDTO {
    @IsString()
    @MinLength(2)

    name : string;

    @IsEmail()

    email : string;

    @IsString()
    @MinLength(2)

    office : string

    @IsString()
    @MinLength(6)

    password : string;
}