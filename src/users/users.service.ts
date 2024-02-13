import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersCreateDTO } from "src/users/dto/users-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{
    constructor(
        private readonly prisma : PrismaService
    ){}

    async create({email,name,office,password} : UsersCreateDTO){

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.prisma.users.findFirst({
            where : {
                email 
            } 
        })

        if(user){
            throw new BadRequestException("Este e-mail já está em uso")
        } else{

            await this.prisma.users.create({
                data: {
                    name, 
                    email, 
                    office, 
                    password : hashedPassword
                }
            })

        }
    }
}