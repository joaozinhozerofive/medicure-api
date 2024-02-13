import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthCreateDTO } from "./dto/auth-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Users } from "@prisma/client";


@Injectable()
export class AuthService {

    constructor(private readonly prisma : PrismaService){}

    async create({email, password}: AuthCreateDTO){
        const user = await this.prisma.users.findFirst({

            where : {
                email
            } 
        })

        if(!user){
            throw new BadRequestException("E-mail e/ou senha incorretos")
        }

        const matchedPassword =  await bcrypt.compare(password, user.password)

        if(!matchedPassword){
            throw new BadRequestException("E-mail e/ou senha incorretos")
        }


        return this.newToken(user)


    }


     newToken(user : Users){
        try {
            const payload = {
                user_id : user.id,
                name : user.name, 
                email : user.email
            }
            const token = jwt.sign(
                 payload,
                 process.env.AUTH_SECRET,
            {
                 expiresIn : process.env.EXP_TOKEN    
            })


            return ({token, user })

        }catch{
            throw new BadRequestException("Não foi possível encontrar estes dados")
        }
    }
}