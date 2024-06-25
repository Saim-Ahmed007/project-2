import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async(req,res)=>{

    const result = await offeredCourseServices.createOfferedCourseIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is created succesfully',
        data: result,
    })
})

const getOfferedCourse = catchAsync(async(req,res)=>{
    const result = await offeredCourseServices.getOfferedCourseFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is retrived succesfully',
        data: result,
    })
})

const getSingleOfferedCourse = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Offered Course is retrived succesfully',
        data: result,
    })
})

const updateOfferedCourse = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await offeredCourseServices.updateOfferedCourseIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is Updated succesfully',
        data: result,
    })
})

const deleteOfferedCourse = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await offeredCourseServices.deleteOfferedCourseFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is Deleted succesfully',
        data: result,
    })
})

export const OfferedCourseController = {
    createOfferedCourse,
    getOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse,
    deleteOfferedCourse
}