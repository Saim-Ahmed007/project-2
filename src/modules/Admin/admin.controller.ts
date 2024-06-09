import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllAdmin = catchAsync(async(req, res)=>{
    const result = await AdminServices.getAllAdminsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Admins are retrieved succesfully',
        data: result,
    })
})

const getSingleAdmin = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await AdminServices.getSingleAdminFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Admin is retrieved succesfully',
        data: result,
    })
})

const updateAdmin = catchAsync(async(req,res)=>{
    const {id} = req.params
    const {admin} = req.body
    const result = await AdminServices.updateAdminIntoDB(id,admin)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Admin is updated succesfully',
        data: result,
    })
})

const deleteAdmin = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await AdminServices.deleteAdminFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is deleted succesfully',
        data: result,
    })
})

export const AdminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin

}