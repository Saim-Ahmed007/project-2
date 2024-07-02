import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { TJwtPayload, TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../app/config';
import { createToken } from './auth.utils';


const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found', '');
  }

  if (await User.isUserDeleted(true)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already deleted', '');
  }
  if (await User.isUserBlocked('blocked')) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already blocked', '');
  }

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched', '');
  }

  //check is user exist

  // const isUSerExist = await User.findOne({id: payload.id})
  // if(!isUSerExist){
  //   throw new AppError(httpStatus.BAD_REQUEST, 'User not found', '');
  // }

  //check if the user is already deleted

  // const isDeleted = isUserExist?.isDeleted;
  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'User already deleted', '');
  // }

  // //check if the user is already blocked

  // const isBlocked = isUserExist?.status;
  // if (isBlocked === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'User already blocked', '');
  // }

  //check if password is correct

  //create token for client
  const jwtPayload: TJwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string)
  
  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string)
  
  return {accessToken,refreshToken, needsPasswordChange: user.needsPasswordChange};
};

const changePassword = async (
  userData: TJwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByCustomId(userData.userId);
  
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found', '');
  }

  if (await User.isUserDeleted(true)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already deleted', '');
  }

  if (await User.isUserBlocked('blocked')) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already blocked', '');
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched', '');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  
  return await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    { password: newHashedPassword , needsPasswordChange:false, passwordChangedAt:new Date()},
    {new:true}
  );
};

const refreshToken = async(token : string)=>{


  //check if the token is valid
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as TJwtPayload

  const {userId, iat} = decoded 

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

    const jwtPayload: TJwtPayload = {
      userId: user.id,
      role: user.role,
    };
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string)

    return {
      accessToken
    }

}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken
};
