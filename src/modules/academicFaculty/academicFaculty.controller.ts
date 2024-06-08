import { academicFacultyServices } from "./academicFaculty.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

const createFaculty = catchAsync(async(req, res)=>{
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body)
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success: true,
        message : 'Academic Faculty create successfully',
        data: result        
    })
})

const getAllAcademicFaculties = catchAsync(async(req, res)=>{
    const result = await academicFacultyServices.getAllFacultiesFromDB()
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success: true,
        message : 'Academic Faculties retrive successfully',
        data: result        
    })
})

const getSingleFaculty = catchAsync(async(req, res)=>{
    const {facultyID} = req.params
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyID)
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success: true,
        message : 'Single Academic Faculty found successfully',
        data: result        
    })
})

const updateFaculty = catchAsync(async(req, res)=>{
    const {facultyID} = req.params
    const result = await academicFacultyServices.updateAcademicFacultyFromDB(facultyID, req.body)
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success: true,
        message : 'Academic Faculty updated successfully',
        data: result        
    })
    
})

export const academicFacultyController = {
    createFaculty,
    getAllAcademicFaculties,
    getSingleFaculty,
    updateFaculty
}