import { Faculty } from "./faculty.model"
import QueryBuilder from "../../app/builder/QueryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
import { TFaculty } from "./faculty.interface"
import mongoose from "mongoose"
import AppError from "../../app/errors/AppError"
import httpStatus from "http-status"


const getAllFacultiesFromDB = async(query:Record<string, unknown>)=>{
    const facultyQuery = new QueryBuilder(Faculty.find().populate('academicDepartment'),
    query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

    const result = await facultyQuery.modelQuery
    return result;
}

const getSingleFacultyFromDB = async (id: string)=>{
    const result = await Faculty.findById({id}).populate('academicDepartment')
    return result
}

const updateFacultyFromDB = async(id:string, payload: Partial<TFaculty>)=>{
    const{name, ...remainingFacultyData} = payload
    const modifiedUpdatedData : Record<string, unknown> = {...remainingFacultyData}

    //update non premitive data
    if(name && Object.keys(name).length){
        for(const[key, value]of Object.entries(name)){
            modifiedUpdatedData[`name${key}`] = value
        }
    }
    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true
    })
    return result

}

const deleteFacultyFromDB = async(id:string)=>{
    const session = await mongoose.startSession()
    try{
        session.startTransaction()
        const deletedFaculty = await Faculty.findByIdAndUpdate(id,
            {isDeleted: true},
            {new:true, session} 
        )
        if(!deletedFaculty){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty", '')
        }

        //get user _id from deleted faculty
        const userId = deletedFaculty.user

        const deletedUser = Faculty.findByIdAndUpdate(userId,
            {isDeleted: true},
            {new:true, session}
        )
        if(!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user", '')
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedFaculty
    }catch(error: any){
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error);
    }
}


export const FacultyServices = {
    getAllFacultiesFromDB,
    getSingleFacultyFromDB,
    updateFacultyFromDB,
    deleteFacultyFromDB

}