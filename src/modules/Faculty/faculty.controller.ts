import { Request, Response } from "express";
import { FacultyServices } from "./faculty.service";
import sendResponse from './../../app/utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { Faculty } from "./faculty.model";


const getSingleFaculty = catchAsync(async(req:Request, res:Response)=>{
    const {id} = req.params
    const result = await FacultyServices.getSingleFacultyFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved succesfully',
        data: result,
    })
})

const getAllFaculty = catchAsync(async(req,res)=>{
    const result = await FacultyServices.getAllFacultiesFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Faculties are retrieved succesfully',
        data: result,
    })
})

const updateFaculty = catchAsync(async(req,res)=>{
    const {id} = req.params
    const {faculty} = req.body
    const result = await FacultyServices.updateFacultyFromDB(id, faculty)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is updated succesfully',
        data: result,
    })
})

const deleteFaculty = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await FacultyServices.deleteFacultyFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is deleted succesfully',
        data: result,
    })
})



export const FacultyController = {
    getSingleFaculty,
    getAllFaculty,
    updateFaculty,
    deleteFaculty

}