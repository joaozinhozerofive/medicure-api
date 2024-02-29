import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Patch, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {File} from 'multer'
import { FileService } from "./file.service";


@Controller('files')
export class FileController{

    constructor(private readonly fileService : FileService){}

    @UseInterceptors(FileInterceptor('file'))
    @Patch('patient/:id')
    async updateFilePatient(
        @UploadedFile( new ParseFilePipe ({
            validators : [
                new FileTypeValidator({fileType : 'image/png' || 'image/jpg' || 'image/jpeg'}), 
                new MaxFileSizeValidator({maxSize : 1024 * 50})
            ]
        })) file : File, 
        @Param('id') id : string

    ){
        await this.fileService.updateFilePatient(file, id)
    }

    @UseInterceptors(FileInterceptor('file'))
    @Patch('doctor/:id')
    async updateFileDoctor(
        @UploadedFile( new ParseFilePipe ({
            validators : [
                new FileTypeValidator({fileType : 'image/png'}), 
                new MaxFileSizeValidator({maxSize : 1024 * 50})
            ]
        })) file : File, 
        @Param('id') id : string

    ){
        await this.fileService.updateFileDoctor(file, id)
    }
}