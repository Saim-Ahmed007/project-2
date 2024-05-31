import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { AcademicSemseterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res, next) => {
    
  const result = await AcademicSemseterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : 'Academic Semester is created successfully',
    data : result,
  })

}) 

const getAcademicSemester = catchAsync(async(req, res)=> {
  const result = await AcademicSemseterServices.getAcademicSemesterIntoDB()
  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : 'Academic Semester is retrived successfully',
    data : result,
  })
})

const getSingleAcademicSemester = catchAsync(async(req,res)=>{
  const {academicSemesterID} = req.params
  const result = await AcademicSemseterServices.getSingleAcademicSemesterIntoDB(academicSemesterID)
  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : 'Academic Semester found successfully',
    data : result,
  })

})

const updateSingleAcademicSemester = catchAsync(async(req,res)=>{
    const {semesterId} = req.params
    const result = await AcademicSemseterServices.updateAcademicSemesterIntoDB(semesterId, req.body)
    sendResponse(res, {
      statusCode : httpStatus.OK,
      success : true,
      message : 'Academic Semester updated successfully',
      data : result,
    })
})

export const AcademicSemseterController = {
    createAcademicSemester,
    getAcademicSemester,
    getSingleAcademicSemester,
    updateSingleAcademicSemester
}