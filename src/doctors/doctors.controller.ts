import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Put } from "@nestjs/common";
import { Param, Query, Res, UploadedFile, UseInterceptors} from "@nestjs/common/decorators"
import { DoctorsService } from "./doctors.service";
import { DoctorCreateDTO } from "./dto/doctor-create.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import {File} from 'multer'
import { DoctorUpdateDTO} from "./dto/doctor-update.dto";
import { Response } from "express";

@Controller('doctors')
export class DoctorsController{
    constructor(
        private readonly doctorsService : DoctorsService,
        ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() {name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation, office} : DoctorCreateDTO,
        @UploadedFile( new ParseFilePipe ({
            validators : [
                new FileTypeValidator({fileType : 'image/png'}), 
                new MaxFileSizeValidator({maxSize : 1024 * 50})
            ]
        })) file : File, 
        )
        {
            return await this.doctorsService.create({name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation, file, office})
       
    }

    @Put(":id")
    async update(@Body() {name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation, office}:DoctorUpdateDTO, 
    @Param('id') id : string
    )

    {
        return await this.doctorsService.update({name, email, cpf, phone, birth, zipCode, adress, neighborhood, residenceCode, observation,id, office})
    }

    @Get()
    async index(@Query('name') name : string, @Res() res : Response){
        return await this.doctorsService.index(name, res)
    }

    @Get(":id")
    async show(@Param('id') id :  string, @Res() res : Response){
        await this.doctorsService.show(id, res)
    }

    @Delete(":id")
    async delete(@Param('id') id : string ){
        await this.doctorsService.delete(id)
    }
}
