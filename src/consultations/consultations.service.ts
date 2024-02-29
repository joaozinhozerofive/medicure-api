import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConsultationsCreateDTO } from "./dto/consultations-create.dto";
import { ConsultationsUpdateDTO } from "./dto/consultations-update.dto";
import { Response } from "express";

@Injectable()
export class ConsultationsService {
    constructor(private readonly prisma : PrismaService){}

    async create({date, patient_id, doctor_id, finished, timetable, observation} : ConsultationsCreateDTO){
        if(!date || !patient_id || !doctor_id || finished === undefined || !timetable || !observation){
            throw new BadRequestException("Você precisa preencher todos os campos para continuar")
        }

        const patient = await this.prisma.patients.findFirst({
            where: {
                id : patient_id
            }
        })


        const doctor = await this.prisma.doctors.findFirst({
            where: {
                id : doctor_id
            }
        })

        if(!doctor){
            throw new BadRequestException("Não foi possível encontrar este médico")
        }

        if(!patient){
            throw new BadRequestException("Não foi possível encontrar este paciente")
        }



        const checkDateExists = await this.prisma.dates.findFirst({
            where : {
                date, 
                doctor_id
            }
        })
      
        if(!checkDateExists){
            throw new BadRequestException("Não existem horários para a data selecionada")
        }

        const checkTimeTableIsOcuped = await this.prisma.consultations.findFirst({
            where : {
                date,
                timetable,
                doctor_id
            }
        })

        const checkTimeTableExist = await this.prisma.hourly.findMany({
            where : {
                timetable, 
                date_id : checkDateExists.id
            }
        })

        if(checkTimeTableIsOcuped || !checkTimeTableExist){
            throw new BadRequestException("Este horário não está disponível para a data desejada.")
        }

        const hourlyId = await this.prisma.hourly.findFirst({
            where : {
                timetable, 
                dateSelected : date
            } 
           })

        try{

            await this.prisma.hourly.update({
                where : {
                    id : hourlyId.id
            }, 
            data : {
                available : false
            }
            })

            await this.prisma.consultations.create({
                data : {
                    date, 
                    patient_id, 
                    doctor_id, 
                    finished, 
                    timetable, 
                    observation
                }
            })

        }catch{
            throw new BadRequestException("Não foi possível agendar consulta")
        }

    }

    async update({date, patient_id, doctor_id, finished, timetable, observation, id} : ConsultationsUpdateDTO){

        const consultation = await this.prisma.consultations.findFirst({
            where : {
                id : Number(id)
            }
        })


        if(!consultation){
            throw new BadRequestException("Não foi possível encontrar esta consulta")
        }


        const patient = await this.prisma.patients.findFirst({
            where: {
                id : patient_id
            }
        })


        const doctor = await this.prisma.doctors.findFirst({
            where: {
                id : doctor_id
            }
        })

        if(!doctor){
            throw new BadRequestException("Não foi possível encontrar este médico")
        }

        if(!patient){
            throw new BadRequestException("Não foi possível encontrar este paciente")
        }

        const checkDateExists = await this.prisma.dates.findFirst({
            where : {
                date, 
                doctor_id
            }
        })


        if(!checkDateExists){
            throw new BadRequestException("Não existem horários para a data selecionada")
        }

        const checkTimeTableIsOcuped = await this.prisma.consultations.findFirst({
            where : {
                date,
                timetable,
                doctor_id
            }
        })

        const checkTimeTableExist = await this.prisma.hourly.findMany({
            where : {
                timetable, 
                date_id : checkDateExists.id
            }
        })

        if(checkTimeTableExist.length < 1){
            throw new BadRequestException("Este horário não está disponível para a data desejada.")
        }

        if(checkTimeTableIsOcuped && checkTimeTableIsOcuped.id !== Number(id)){
            throw new BadRequestException("Este horário não está disponível para a data desejada.")
        }

        try{

            const dates = await this.prisma.dates.findFirst({
                where : {
                    doctor_id : consultation.doctor_id, 
                    date : consultation.date
                    
                }
            })

            const consultationHourly = await this.prisma.hourly.findFirst({
                where : {
                    timetable : consultation.timetable,
                    dateSelected : consultation.date,
                    date_id : dates.id
                }
            })

            const hourlyUpdate = await this.prisma.hourly.findFirst({
                where : {
                    date_id : checkDateExists.id, 
                    timetable
                }
            })

            

            if(timetable !== consultation.timetable){
                await this.prisma.hourly.update({
                    where : {
                        id : consultationHourly.id
                    }, 
                    data: {
                        available : true
                    }
                })

                await this.prisma.hourly.update({
                    where : {
                        id : hourlyUpdate.id
                    }, 
                    data : {
                        available  : false
                    }
                })


            }


            
            
            await this.prisma.consultations.update({
                where : {
                    id : Number(id)
                }, 
                data: {
                    date, 
                    patient_id, 
                    doctor_id, 
                    finished, 
                    timetable, 
                    observation,
                }
            })
        }catch{
            throw new BadRequestException("Não foi possível alterar esta consulta")
        }
    }

    async index(doctor_id : string,  res : Response, date : string){

            let consultations = [];

            if(doctor_id && date){

                consultations = await this.prisma.consultations.findMany({
                    where : {
                        doctor_id : Number(doctor_id), 
                        date
                    },
                    include :{
                        patient : true
                    }
                })
            }

            return res.json(consultations)
            }
           

    async show(id : string, res : Response){
        const consultation = await this.prisma.consultations.findFirst({
            where : {
                id : Number(id)
            }, 
            include : {
                patient : true
            }
        })

        if(!consultation){
            throw new BadRequestException("Não foi possível encontrar esta consulta.")
        }else{
            return res.json(consultation)
        }
    }

    async delete(id : string){
        const consultation = await this.prisma.consultations.findFirst({
            where : {
                id : Number(id)
            }, 
        })

        const dates = await this.prisma.dates.findFirst({
            where : {
                doctor_id : consultation.doctor_id, 
                date : consultation.date
            }
        })

        const hourlyUpdate =  await this.prisma.hourly.findFirst({
            where : {
                timetable : consultation.timetable,
                date_id : dates.id
            }
        })


        

        if(!consultation){
            throw new BadRequestException("Não foi possível encontrar esta consulta.")
        } else{
            await this.prisma.hourly.update({
                where : {
                    id : hourlyUpdate.id
                }, 
                data : {
                    available : true
                }
            })

            await this.prisma.consultations.delete({
                where :{
                    id : Number(id)
                }
            })


        }

}
}