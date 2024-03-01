import {IsString, IsEmail, Matches, MinLength, IsOptional } from 'class-validator'


export class PatientUpdateDTO{
    phone? : string;

    @IsOptional()
    id? : string | number

    @IsString()
    @MinLength(2)
    name? : string;

    @IsOptional()
    @IsString()
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    cpf?: string;

    @IsOptional()
    @IsEmail()
    email? : string;


    @IsOptional()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/, { message: 'A data deve estar no formato dd/mm/yyyy' })
    birth? : string;


    @IsOptional()
    @IsString()
    @Matches(/^\d{5}-\d{3}$/)
    zipCode? : string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    adress?: string;
    neighborhood? : string;
    
    @IsOptional()
    @IsString()
    residenceCode? : string 

    @IsOptional()
    @IsString()
    observation? : string;
    
}