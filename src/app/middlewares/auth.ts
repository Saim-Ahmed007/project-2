import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
import httpStatus from "http-status"
import jwt, {JwtPayload}  from 'jsonwebtoken'
import config from "../config"
import { TUserRole } from "../../modules/user/user.interface"
import { TJwtPayload } from "../../modules/Auth/auth.interface"
import { User } from "../../modules/user/user.model"

declare module 'express-serve-static-core' {
    interface Request {
      user?: TJwtPayload; 
    }
  }

const auth = (...requiredRoles : TUserRole[]) => {
    return catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
        const token = req.headers.authorization

        //if the token is sent from the client
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized','')
        }

         //check if the token is valid
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as TJwtPayload

        const {role, userId, iat} = decoded 
        
        const user = await User.isUserExistByCustomId(userId);
  
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found', '');
        }

        if (await User.isUserDeleted(true)) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User already deleted', '');
        }

        if (await User.isUserBlocked('blocked')) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User already blocked', '');
        }

        if(user.passwordChangedAt && 
            User.isJwtIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)){
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized','')
            }
           
            if(requiredRoles && !requiredRoles.includes(role)){
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized','')
            }
          
            req.user = decoded as TJwtPayload
            next()
        
    })
}

export default auth