import { BadRequestException, Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { File } from 'multer';
import {join} from "path";
import {randomBytes} from 'crypto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FileService {

    constructor(private readonly prisma : PrismaService){}

    async upload(file: File) {
        const fileHash =  randomBytes(10).toString("hex")
        const filename = `${fileHash}-${file.originalname}`;

        const TMP_FOLDER = join(__dirname, "..", "..", "TMP"); 
        const destination = join(TMP_FOLDER, filename);

        await writeFile(destination, file.buffer);

        return filename
    }


async updateFilePatient(file :File, id : string ){
        const patient = await this.prisma.patients.findFirst({
            where : {
                id : Number(id)
            }
        })

        if (!patient){
            throw new BadRequestException('Não foi possível encontrar este paciente')

        }


        const filename = await this.upload(file)


        try{

            await this.prisma.patients.update({
                where : {
                    id : Number(id)
                }, 
                data : {
                    img : filename
                }
            })

        }catch{
            throw new BadRequestException("Não foi possível atualizar o arquivo no banco de dados")
        }
    }


async updateFileDoctor(file :File, id : string ){
        const doctor = await this.prisma.doctors.findFirst({
            where : {
                id : Number(id)
            }
        })

        if (!doctor){
            throw new BadRequestException('Não foi possível encontrar este paciente')

        }


        const filename = await this.upload(file)


        try{

            await this.prisma.doctors.update({
                where : {
                    id : Number(id)
                }, 
                data : {
                    img : filename
                }
            })

        }catch{
            throw new BadRequestException("Não foi possível atualizar o arquivo no banco de dados")
        }
    }

}

