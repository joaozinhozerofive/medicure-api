import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { DateService } from "./date.service";
import { DatesCreateDTO } from "./dto/dates-create.dto";
import { Response } from "express";
import { DatesUpdateDTO } from "./dto/dates-update.dto";

@Controller('dates')
export class DateController{
    constructor(private readonly dateService : DateService){}


    @Post()
    async create(@Body() {date, timetables, doctor_id} : DatesCreateDTO, @Res() res : Response){
        return res.json(await this.dateService.create({date, timetables, doctor_id}))  
    }

    @Put(':id')
    async update(@Body() {date, doctor_id, timetables} : DatesUpdateDTO, @Param('id') id : string, @Res() res : Response ){
        return res.json(await this.dateService.update({date, doctor_id, timetables, id}))
    }

    @Get()
    async index(@Query('doctor_id') doctor_id : string, @Res() res : Response){
        return await this.dateService.index(res, doctor_id )
    }

    @Get(':id')
    async show(@Param('id') id : string, @Res() res : Response){
        return await this.dateService.show(id, res)
    }

    @Delete(':id')
    async delete(@Param('id') id : string,  @Res() res : Response){
     return res.json(await this.dateService.delete(id))
    }
}