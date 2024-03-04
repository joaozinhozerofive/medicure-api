import { Body, Controller, Delete,  Get, Post, Put } from "@nestjs/common";
import { Param, Query, Res, UploadedFile, UseInterceptors} from "@nestjs/common/decorators"
import { PatientsService } from "./patients.service";
import { PatientCreateDTO } from "./dto/patient-create.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import {File} from 'multer'
import { PatientUpdateDTO } from "./dto/patient-update.dto";
import { Response } from "express";

@Controller('patients')
export class PatientsController{
    constructor(
        private readonly patientsService : PatientsService,
        ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() {name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation} : PatientCreateDTO,
        @UploadedFile() file : File, 
        )
        {
            return await this.patientsService.create({name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation, file})
       
    }

    @Put(":id")
    async update(@Body() {name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation}:PatientUpdateDTO, 
    @Param('id') id : string
    )

    {
        return await this.patientsService.update({name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation,id})
    }

    @Get()
    async index(@Query('name') name : string, @Res() res : Response){
        return await this.patientsService.index(name, res)
    }

    @Get(":id")
    async show(@Param('id') id :  string, @Res() res : Response){
        await this.patientsService.show(id, res)
    }

    @Delete(":id")
    async delete(@Param('id') id : string ){
        await this.patientsService.delete(id)
    }
}
