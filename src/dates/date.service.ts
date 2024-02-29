import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DatesCreateDTO } from "./dto/dates-create.dto";
import { DatesUpdateDTO } from "./dto/dates-update.dto";
import { Response } from "express";

@Injectable()
export class DateService{
    constructor(private readonly  prisma : PrismaService){}

    async create({date, timetables, doctor_id} : DatesCreateDTO){
        const doctor  = await this.prisma.doctors.findFirst({
            where: { 
                id : doctor_id
            }
        })

        if(!doctor){
            throw new BadRequestException("Não foi possível encontrar este médico")
        }

        const checkDateExists = await this.prisma.dates.findFirst({
            where : {
                date, 
                doctor_id
            }
        }) 

        if(checkDateExists){
            throw new BadRequestException("Esta data já está criada para o mesmo médico")
        }


        try{
            const newDate = await this.prisma.dates.create({
                data: {
                    date,
                    doctor_id
                }, 
                select :{
                    id :true
                }
            })
    
    
            timetables.map(async (timetable) => {
    
                await this.prisma.hourly.createMany({
                    data :{
                        timetable, 
                        date_id : newDate.id,
                        dateSelected : date
                    }
                })
            })

        }catch{
            throw new BadRequestException("Não foi possível crirar data e horários")
        }
        

        return

    }

    async update({date, doctor_id, timetables, id} : DatesUpdateDTO){

        if(!doctor_id){
            throw new BadRequestException("Por favor, insira o id do médico")
        }
        if(!date){
            throw new BadRequestException("Por favor, insira uma data para alterar")
        }

        const dateIdExists = await this.prisma.dates.findFirst({
            where : {
                id : Number(id)
            }
        })

        if(!dateIdExists){
            throw new BadRequestException("Não foi possível encontrar nenhuma data correspondente a este id")
        }else{
            const checkDateExists = await this.prisma.dates.findFirst({
                where : {
                    date, 
                    doctor_id : dateIdExists.doctor_id
                }
            })

            if(checkDateExists && checkDateExists.id !== dateIdExists.id){
                throw new BadRequestException("Está data já está criada para o mesmo médico")
            } 


            try {
                await this.prisma.dates.update({
                    where : {
                        id : Number(id)
                    },
                    data : {
                        date, 
                        doctor_id
                    }
                })

                if(timetables){
                    await this.prisma.hourly.deleteMany({
                        where : {
                            date_id : Number(id)
                        }
                    })

                    timetables.map(async (timetable) => {
    
                        await this.prisma.hourly.createMany({
                            data :{
                                timetable, 
                                date_id : Number(id), 
                                dateSelected : date

                            }
                        })
                    })
                    
                }

            }catch{
                throw new BadRequestException("Não foi possível alterar data e horários")
            }

        }
    }   

    async index(res : Response, doctor_id : string){

        const checkDoctorExits =  await this.prisma.doctors.findFirst({
            where : {
                id : Number(doctor_id)
            }
        })

        if(!checkDoctorExits){
            throw new BadRequestException("Não foi possível encontrar este médico")
        }

        const dates = await this.prisma.dates.findMany({
            where : {
                doctor_id : Number(doctor_id)
            }, 
            include :{
                hourly : true
            }
        })
        

        return res.json(dates)
    }

    async show(id : string, res : Response){
        const date =  await this.prisma.dates.findFirst({
            where : {
                id : Number(id)
            }, 
            include : {
                hourly : true
            }
        })

        return res.json(date)
    }

    async delete(id : string){
        const date = await this.prisma.dates.findFirst({
            where : {
                id : Number(id)
            }
        })

        if(!date){
            throw new BadRequestException("Não foi possível encontrar nenhuma data correspondente.")
        }else{
            await this.prisma.dates.delete({
                where : {
                    id : Number(id)
                }
            })
        }

        return "Data deletada"

        
    }
}