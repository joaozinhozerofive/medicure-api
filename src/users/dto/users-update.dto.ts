import {IsEmail, IsString, MinLength, IsOptional} from 'class-validator'

export class UsersUpdateDTO {
    user_id? : number

    @IsString()
    @IsOptional()
    @MinLength(2)

    name? : string;

    @IsEmail()
    @IsOptional()

    email? : string;

    @IsString()
    @IsOptional()

    office? : string;

    @IsString()
    @MinLength(6)
    @IsOptional()

    password? : string;
    old_password? : string;

    
}