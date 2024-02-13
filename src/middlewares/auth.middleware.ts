import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { NextFunction, Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req : Request, res :  Response, next : NextFunction){
        const authHeaders = req.headers['authorization'];

        if(!authHeaders){
            throw new UnauthorizedException("JWT token inválido")
        }


        const [ , token] = authHeaders.split(" ")

        try{

            const {sub : user_id} = jwt.verify(token, process.env.AUTH_SECRET)

            req.user = {
                id : Number(user_id)
            }

            return next();

        }catch{
            throw new UnauthorizedException("JWT token inválido")
        }

      
    }
}
