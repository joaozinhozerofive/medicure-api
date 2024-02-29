import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthCreateDTO } from "./dto/auth-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'


export interface Userprops {
    name : string,
    email : string, 
    office : string, 
    password? : string, 
    id : number
}

@Injectable()
export class AuthService {

    constructor(private readonly prisma : PrismaService){}

    async create({email, password}: AuthCreateDTO){
        const user = await this.prisma.users.findFirst({

            where : {
                email
            }, 
        })

        if(!user){
            throw new BadRequestException("E-mail e/ou senha incorretos")
        }

        const matchedPassword =  await bcrypt.compare(password, user.password)

        if(!matchedPassword){
            throw new BadRequestException("E-mail e/ou senha incorretos")
        }

        const userSelect = await this.prisma.users.findFirst({

            where : {
                email
            }, 
            select : {
                name : true,
                email : true, 
                office : true, 
                password : false, 
                createdAt : true, 
                updatedtAt : true, 
                id : true

            }
        })


        return this.newToken(userSelect)


    }


     newToken(user : Userprops){
        try {
            const user_id = user.id
            const token = jwt.sign({}, process.env.AUTH_SECRET, {
                subject : String(user_id), 
                expiresIn : process.env.EXP_TOKEN
            })


            return ({token, user })

        }catch{
            throw new BadRequestException("Não foi possível encontrar estes dados")
        }
    }
}