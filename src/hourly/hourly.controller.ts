import { Controller, Get, Query, Res } from "@nestjs/common";
import { HourlyService } from "./hourly.service";
import { Response } from "express";

@Controller('hourly')
export class HourlyController{

    constructor(private readonly hourlyService : HourlyService){}

    @Get()
    async index(@Query('date') date : string, @Query('doctor_id') doctor_id : string, @Res() res : Response ){
        return await this.hourlyService.index(date, doctor_id, res)
    }
}