import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HourlyService{
    constructor(private readonly prisma : PrismaService){}

    async index(date : string, doctor_id : string, res : Response){
        const dates =  await this.prisma.dates.findFirst({
            where : {
                date, 
                doctor_id :  Number(doctor_id)
            }
        })


        const hourly =  await this.prisma.hourly.findMany({
            where :{
                date_id : dates.id
            }
        })

        res.json(hourly)
    }
}
    