import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AuthServices } from "./auth.service";
import { User } from './../user/user.model';
import { TJwtPayload } from "./auth.interface";
import config from "../../app/config";

const loginUsers = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body)
    const {refreshToken, accessToken, needsPasswordChange} = result 
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly : true
    })
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Logged in successfully',
        data: {
            accessToken,
            needsPasswordChange
        }
    })
})

const changePassword = catchAsync(async(req,res)=>{
    
    //console.log(req.user, req.body);
    const {...passwordData} = req.body
    const result = await AuthServices.changePassword(req.user as TJwtPayload, passwordData)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully',
        data: result,
    })
}) 

const refreshToken = catchAsync(async(req,res)=>{
    const {refreshToken} = req.cookies
    const result = await AuthServices.refreshToken(refreshToken)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved successfully',
        data: result
    })

})

export const AuthController = {
    loginUsers,
    changePassword,
    refreshToken
}