import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async()=>{
    const lastStudent = await UserModel.findOne({
        role : 'student'
    },{
        id : 1,
        _id : 0
    },).sort({createdAt : -1})
    .lean()

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}


 //year studentCode 4 digit
export const generateStudentId = async (payload: TAcademicSemester)=>{
    
    //first time 0000
    const currendId = await findLastStudentId() || (0).toString()
    let incrementID = (Number(currendId)+1).toString().padStart(4, '0');
    incrementID = `${payload.year}${payload.code}${incrementID}`
    return incrementID
}