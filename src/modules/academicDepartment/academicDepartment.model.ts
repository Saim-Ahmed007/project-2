import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name : {
        type:String,
        required: true,
        unique: true
    },
    academicfaculty: {
        type : Schema.Types.ObjectId,
        ref:'academicFaculty'
    }
},{
    timestamps:true 
})

academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExist = await AcademicDepartment.findOne({name: this.name})
    if(isDepartmentExist){
        throw new Error("Department already Exist")
    }
    next()
})



//if departmentId is not exist then we can not update academic department 
academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery()
    const isDepartmentExist = await AcademicDepartment.findOne(query)
    if(!isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND,"Department does not exist", '')
    }
    next()
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)