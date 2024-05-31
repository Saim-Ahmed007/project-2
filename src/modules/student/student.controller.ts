import { NextFunction, Request, RequestHandler, Response} from 'express';
import { StudentServices } from './student.service';
import {z} from 'zod';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';



const getStudents = catchAsync(async (req ,res, next) => {
    const result = await StudentServices.getStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
   
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  
  const { studentID } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentID);
  console.log(result);
  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : 'Student is retrived successfully',
    data : result,
  })
 
});

const deleteStudent = catchAsync(async (req, res, next) => {

  const { studentID } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentID);
  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : 'Student is deleted successfully',
    data : result,
  })
}) 

export const StudentController = {
  getStudents,
  getSingleStudent,
  deleteStudent
};
