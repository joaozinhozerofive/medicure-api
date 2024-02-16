import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DoctorCreateDTO } from "./dto/doctor-create.dto";
import { FileService } from "src/file/file.service";
import { DoctorUpdateDTO } from "./dto/doctor-update.dto";
import { Response } from "express";

@Injectable()
export class DoctorsService{
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
        file, 
        office
    }: DoctorCreateDTO) {

      
      
      if(!name || !email || !cpf || !phone || !birth || !zipCode || !adress || !neighborhood || !residenceCode || !observation){
         throw new BadRequestException("Por favor, insira todos os campos necessários para continuar")
      }else{
         let filename : string;

         if(file){
            filename = await this.fileService.upload(file)
         }
         try{
            await this.prisma.doctors.create({
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
                  img : filename, 
                  office
               }
            })

         }catch{
            throw new BadRequestException("Não foi possível criar médico")
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
      id, 
      office
   }: DoctorUpdateDTO){

      const user = await this.prisma.doctors.findFirst({
         where :{
            id : Number(id)
         }
      })


      if(!user){
         throw new BadRequestException("Não foi possível encontrar este usuário")
      }

      try{
         await this.prisma.doctors.update({
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
               office
            }
         })
      }catch{
         throw new BadRequestException("Nâo foi possível atualizar os dados deste usuário")
      }
    }


    async index(name : string, res : Response){

         const doctors = await this.prisma.doctors.findMany({

            where: {
                  name:{
                     contains : name, 
                     mode : "insensitive"
                 }
            }
         })
         
         return res.json(doctors)

    }

    async show(id : string, res : Response){


      const doctor = await this.prisma.doctors.findFirst({
         where : {
            id: Number(id)
         }
      })

      if(!doctor){
         throw new BadRequestException("Não foi possível encontrar este médico")
      }else{
         res.json(doctor)
      }

      
    }

    async delete(id : string){

      const doctor = await this.prisma.doctors.findFirst({
         where : {
            id : Number(id)
         }
      })

      if(!doctor){
         throw new BadRequestException("Não foi possível encontrar este médico")
      }else{
         await this.prisma.doctors.delete({
            where : {
               id : Number(id)
            }
         })
      }
    }
}