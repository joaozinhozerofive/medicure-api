import { Controller, Param, Patch, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {File} from 'multer'
import { FileService } from "./file.service";


@Controller('files')
export class FileController{

    constructor(private readonly fileService : FileService){}

    @UseInterceptors(FileInterceptor('file'))
    @Patch('patient/:id')
    async updateFilePatient(
        @UploadedFile() file : File, 
        @Param('id') id : string

    ){
        await this.fileService.updateFilePatient(file, id)
    }

    @UseInterceptors(FileInterceptor('file'))
    @Patch('doctor/:id')
    async updateFileDoctor(
        @UploadedFile() file : File, 
        @Param('id') id : string

    ){
        await this.fileService.updateFileDoctor(file, id)
    }
}