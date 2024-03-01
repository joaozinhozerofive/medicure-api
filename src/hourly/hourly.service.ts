import { BadRequestException, Injectable } from "@nestjs/common";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HourlyService{
    constructor(private readonly prisma : PrismaService){}

    async index(date : string, doctor_id : string, res : Response, consultation_id : string){

        const dates =  await this.prisma.dates.findFirst({
            where : {
                date, 
                doctor_id :  Number(doctor_id)
            }
        })


        if(dates){
            const hourly =  await this.prisma.hourly.findMany({
                where :{
                    date_id : dates.id, 
                    available : true
                }, 
                select : {
                    timetable : true
                }
            })


            if(consultation_id){
                const consultation = await this.prisma.consultations.findFirst({
                    where :{
                        id : Number(consultation_id)
                    }
                })


                if(consultation.date === date){

                    const consultationHourly = consultation.timetable
        
                    const timetables = hourly.concat({ timetable: consultationHourly });
                
                    res.json(timetables)
                }else{
                    res.json(hourly)
                }
        
            }
            
        }else{
            res.json()
        }

        
    }


    async show(date_id : string, res : Response){

        const date = await this.prisma.dates.findFirst({
            where : {
                id : Number(date_id)
            }
        })


        if(!date){
            throw new BadRequestException("Não foi possível encontrar esta data")
        }else{
            const hourly = await this.prisma.hourly.findMany({
                where : {
                    date_id : date.id
                }
            })


            res.json(hourly)
        }

        
    }
}
    