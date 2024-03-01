import { IsBoolean, IsNumber, IsString, Matches } from 'class-validator'

export class ConsultationsCreateDTO{
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/, { message: 'A data deve estar no formato dd/mm/yyyy' })
    date : string

    @IsString()
    timetable : string


    @IsNumber()
    doctor_id : number
    patient_id : number

    @IsBoolean()
    finished : boolean

    @IsString()
    observation : string

}