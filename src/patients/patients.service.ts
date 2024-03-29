import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PatientCreateDTO } from "./dto/patient-create.dto";
import { FileService } from "src/file/file.service";
import { PatientUpdateDTO } from "./dto/patient-update.dto";
import { Response } from "express";

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

    async update({
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
      id
   }: PatientUpdateDTO){

      const user = await this.prisma.patients.findFirst({
         where :{
            id : Number(id)
         }
      })


      if(!user){
         throw new BadRequestException("Não foi possível encontrar este usuário")
      }

      try{
         await this.prisma.patients.update({
            where : {
               id : user.id
            }, 
            data : {
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
            }
         })
      }catch{
         throw new BadRequestException("Nâo foi possível atualizar os dados deste usuário")
      }
    }


    async index(name : string, res : Response){

         const patients = await this.prisma.patients.findMany({

            where: {
                  name:{
                     contains : name, 
                     mode : "insensitive"
                 }
            }
         })
         
         return res.json(patients)

    }

    async show(id : string, res : Response){


      const patient = await this.prisma.patients.findFirst({
         where : {
            id: Number(id)
         }
      })

      if(!patient){
         throw new BadRequestException("Não foi possível encontrar este paciente")
      }else{
         res.json(patient)
      }

      
    }

    async delete(id : string){

      const patient = await this.prisma.patients.findFirst({
         where : {
            id : Number(id)
         }
      })

      if(!patient){
         throw new BadRequestException("Não foi possível encontrar este paciente")
      }else{
         await this.prisma.patients.delete({
            where : {
               id : Number(id)
            }
         })
      }
    }
}