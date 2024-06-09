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

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async(req,res)=>{
  const {password, admin: adminData} = req.body;
  const result = await UserServices.createAdminIntoDB(password, adminData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
})

export const UserController = {
    createStudent,
    createFaculty,
    createAdmin
}