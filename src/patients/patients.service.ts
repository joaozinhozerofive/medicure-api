import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PatientCreateDTO } from "./dto/patient-create.dto";
import { FileService } from "src/file/file.service";

@Injectable()
export class PatientsService{
    constructor(

       private readonly prisma : PrismaService,
       private readonly fileService : FileService

    ){}

    async create({
        name,
        email, 
        cpf, 
        phone,
        birth, 
        zipCode,
        adress,
        neighborhood, 
        residenceCode,
        observation,
        file
    }: PatientCreateDTO) {

      
      
      if(!name || !email || !cpf || !phone || !birth || !zipCode || !adress || !neighborhood || !residenceCode || !observation){
         throw new BadRequestException("Por favor, insira todos os campos necessários para continuar")
      }else{
         let filename : string;

         if(file){
            filename = await this.fileService.upload(file)
         }
         try{
            await this.prisma.patients.create({
               data :{
                  name,
                  email, 
                  cpf, 
                  phone,
                  birth, 
                  zipCode,
                  adress,
                  neighborhood, 
                  residenceCode,
                  observation,
                  img : filename
               }
            })

         }catch{
            throw new BadRequestException("Não foi possível criar paciente")
         }
      }

    }

    async update(){

    }

    async index(){

    }

    async show(){

    }

    async delete(){

    }
        
}