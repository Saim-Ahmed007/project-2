import { UserServices } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
    
  const {password, student: StudentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, StudentData);

  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : 'Student is created successfully',
    data : result,
  })  

}) 

export const UserController = {
    createStudent,
}