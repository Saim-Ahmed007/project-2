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

    return lastStudent?.id ? lastStudent.id : undefined
}


 //year studentCode 4 digit
export const generateStudentId = async (payload: TAcademicSemester)=>{
    
    //first time 0000
    let currentId = (0).toString() //by default 0000

    //2030 01 0001
    const lastStudentId = await findLastStudentId()
    const lastStudentSemseterCode = lastStudentId?.substring(4,6) //01
    const lastStudentYear = lastStudentId?.substring(0,4) //2030
    const currentSemesterCode = payload.code
    const currentYear = payload.year
    if(
        lastStudentId && lastStudentSemseterCode === 
        currentSemesterCode && lastStudentYear
        === currentYear
     ){
        currentId = lastStudentId.substring(6) //0001

    }
    let incrementID = (Number(currentId)+1).toString().padStart(4, '0');
    incrementID = `${payload.year}${payload.code}${incrementID}`
    return incrementID
}