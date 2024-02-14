import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Put } from "@nestjs/common";
import { UploadedFile, UseInterceptors} from "@nestjs/common/decorators"
import { PatientsService } from "./patients.service";
import { PatientCreateDTO } from "./dto/patient-create.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import {File} from 'multer'

@Controller('patients')
export class PatientsController{
    constructor(
        private readonly patientsService : PatientsService,
        ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() {name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation} : PatientCreateDTO,
        @UploadedFile( new ParseFilePipe ({
            validators : [
                new FileTypeValidator({fileType : 'image/png'}), 
                new MaxFileSizeValidator({maxSize : 1024 * 50})
            ]
        })) file : File, 
        )
        {
            return await this.patientsService.create({name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation, file})
       
    }

    @Put(":id")
    async update(){

    }

    @Get()
    async index(){

    }

    @Get(":id")
    async show(){

    }

    @Delete(":id")
    async delete(){

    }
}
