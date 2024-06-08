import { TAcademicFaculty } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async(payload : TAcademicFaculty)=>{
    const result = await academicFacultyModel.create(payload)
    return result
}

const getAllFacultiesFromDB = async()=>{
    const result = await academicFacultyModel.find();
    return result
}

const getSingleAcademicFacultyFromDB = async(id: string)=>{
    const result = await academicFacultyModel.findById(id)
    return result
}

const updateAcademicFacultyFromDB = async(id: string, payload: Partial<TAcademicFaculty>)=>{
    const result = await academicFacultyModel.findOneAndUpdate({_id : id},
        payload ,{
            new : true
        }
    )
    return result
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyFromDB
}