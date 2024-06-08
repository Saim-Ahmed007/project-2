import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async(payload : TAcademicDepartment) =>{
    const result = await AcademicDepartment.create(payload)
    return result
}

const getAcademicDepartmentIntoDB = async()=>{
    const result = await AcademicDepartment.find().populate('academicfaculty')
    return result
}

const getSingleAcademicDepartmentIntoDB = async(id: string)=>{
    const result = await AcademicDepartment.findById(id)
    return result
}

const updateAcademicDepartmentIntoDB = async(id: string, payload: Partial<TAcademicDepartment>)=>{
    const result = await AcademicDepartment.findOneAndUpdate({_id : id}, payload,
        {
            new: true
        }
    )
    return result
}

export const acdemicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentIntoDB,
    getSingleAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB
}