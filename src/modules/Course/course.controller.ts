import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async(req, res)=>{
    const result = await courseServices.createCourseIntoDB(req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created successfully',
        data: result,
    })
})

const getCourse = catchAsync(async(req,res)=>{
    const result = await courseServices.getAllCourseIntoDB(req.query)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Course are retrived successfully',
        data: result,
    })
})

const getSingleCourse = catchAsync(async(req,res)=>{
    const {id}= req.params
    const result = await courseServices.getSingleCourseIntoDB(id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Course is retrived successfully',
        data: result,
    })
})

const updateCourse = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await courseServices.updateCourseIntoDB(id, req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is updated successfully',
        data: result,
    })
})

const deleteCourse = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await courseServices.deleteCourseFromDB(id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted successfully',
        data: result,
    })
})

const assignFacultiesWithCourse = catchAsync(async(req,res)=>{
    const {courseId} = req.params
    const {faculties} = req.body
    const result = await courseServices.assignFacultiesWithCourseIntoDB(courseId, faculties)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'faculties assigned successfully',
        data: result,
    })
})

const removeFacultiesFromCourse = catchAsync(async(req,res)=>{
    const {courseId} = req.params
    const {faculties} = req.body
    const result = await courseServices.removeFacultiesFromCourseFromDB(courseId, faculties)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'faculties removed successfully',
        data: result,
    })
})

export const CourseController = {
    createCourse,
    getCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}