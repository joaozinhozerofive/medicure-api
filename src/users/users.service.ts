import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersCreateDTO } from "src/users/dto/users-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { UsersUpdateDTO } from "./dto/users-update.dto";

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

    async update({ email, name, office, old_password, password, user_id} : UsersUpdateDTO){

        const user = await this.prisma.users.findFirst({
            where :{
                id : user_id
            }
        })

        const checkEmailExitst = await this.prisma.users.findFirst({

            where: {
                email
            }
        })


        if(checkEmailExitst && checkEmailExitst.id !== user.id){
            throw new BadRequestException("E-mail já em uso")
        }


        if(old_password && !password){
            throw new BadRequestException("Se você deseja atualizar sua senha, digite-a no campo esperado.")
        }

        if(password && !old_password){
            throw new BadRequestException("Você precisa informar a senha antiga para atualizá-la")
        }

        if(password && old_password){
            const matchedPassword = await bcrypt.compare(old_password, user.password)

            if(matchedPassword){
                
                const hashedPassword = await bcrypt.hash(password, 10)
                
                user.password = hashedPassword

            }else{
                throw new BadRequestException("Senha antiga não confere")
            }
        }
        
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.office = office ?? user.office;

      try {
        await this.prisma.users.update({
            where :{
                id : Number(user_id) 
            }, 
            data : user
        })

      } catch{
        throw new BadRequestException("Não foi possível atualizar os dados deste usuário")
      }
    }
}