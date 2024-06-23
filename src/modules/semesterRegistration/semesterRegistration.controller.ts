import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync(async(req,res)=>{

    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is created succesfully',
        data: result,
    })

})

const getSingleSemesterRegistration = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Semester Registration is retrived succesfully',
        data: result,
    })
})

const getAllSemesterRegistration = catchAsync(async(req,res)=>{
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationIntoDB(req.params)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Semester Registration is retrived succesfully',
        data: result,
    })
})

const updateSemesterRegistration = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await SemesterRegistrationServices.updateSemesterRegistrationFromDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is updated succesfully',
        data: result,
    })
})

export const semesterRegistrationController = {
    createSemesterRegistration,
    getSingleSemesterRegistration,
    getAllSemesterRegistration,
    updateSemesterRegistration
}