import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ConsultationsService } from "./consultations.service";
import { Response } from "express";
import { ConsultationsCreateDTO } from "./dto/consultations-create.dto";
import { ConsultationsUpdateDTO } from "./dto/consultations-update.dto";

@Controller('consultations')
export class ConsultationsController{
    constructor(private readonly consultationsService : ConsultationsService){}

    @Post()
    async create(@Res() res : Response, @Body() {date, patient_id, doctor_id, finished, timetable, observation} : ConsultationsCreateDTO){
        return res.json(await this.consultationsService.create({date, patient_id, doctor_id, finished, timetable, observation}))
    }

    @Put(":id")
    async update(@Param('id') id : string, @Body() {date, patient_id, doctor_id, finished, timetable, observation } : ConsultationsUpdateDTO){
        return await this.consultationsService.update({date, patient_id, doctor_id, finished, timetable, observation, id})
    }

    @Get()
    async index(@Query('doctor_id') doctor_id : string,  @Query('date') date : string, @Res() res : Response){
        return await this.consultationsService.index(doctor_id, res, date)
    }

    @Get(':id')
    async show(@Param('id') id : string, @Res() res: Response){
        return await this.consultationsService.show(id, res)
    }

    @Delete(':id')
    async delete(@Param('id') id : string){
        return await this.consultationsService.delete(id)
    }
}