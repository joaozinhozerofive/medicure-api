import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { HourlyService } from "./hourly.service";
import { Response } from "express";

@Controller('hourly')
export class HourlyController{

    constructor(private readonly hourlyService : HourlyService){}

    @Get()
    async index(
    @Query('date') date : string, 
    @Query('doctor_id') doctor_id : string,
    @Query('consultation_id') consultation_id : string, 
    @Res() res : Response
      ){
        return await this.hourlyService.index(date, doctor_id, res, consultation_id)
    }


    @Get(':date_id')
    async show(@Param('date_id') date_id : string, @Res() res : Response){
      await this.hourlyService.show(date_id, res)
    }
}