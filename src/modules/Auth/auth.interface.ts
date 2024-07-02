import { TUserRole } from '../user/user.interface';
import { JwtPayload } from 'jsonwebtoken';

export type TLoginUser = {
    id: string;
    password: string;
}

export type TJwtPayload= {
    userId : string,
    role: TUserRole,
    iat?: number
}