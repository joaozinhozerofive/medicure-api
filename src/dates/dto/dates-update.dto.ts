import {IsNumber, IsOptional, IsString, Matches} from 'class-validator'


export class DatesUpdateDTO{
    @IsOptional()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/, { message: 'A data deve estar no formato dd/mm/yyyy' })
    date? : string

    @IsOptional()
    @IsString({each : true})
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { each : true ,message: 'O formato das horas deve ser HH:MM' })
    timetables? : string[]

    @IsString()
    @IsOptional()
    id? : string


    @IsOptional()
    @IsNumber()
    doctor_id? : number
}