import {IsString, IsEmail, Matches, MinLength } from 'class-validator'
import {File} from 'multer'
export class DoctorCreateDTO{
    file : File
    @IsString()
    @MinLength(2)
    name : string;
    office: string

    @IsString()
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    cpf: string;


    @IsEmail()
    email : string;

    phone : string;


    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/, { message: 'A data deve estar no formato dd/mm/yyyy' })
    birth : string;

    @IsString()
    @Matches(/^\d{5}-\d{3}$/)
    zipCode : string;


    @IsString()
    @MinLength(5)
    adress: string;
    neighborhood : string;

    @IsString()
    residenceCode : string 

    @IsString()
    observation : string;
    
}