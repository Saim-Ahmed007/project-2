import httpStatus from "http-status"
import AppError from "../../app/errors/AppError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { semesterRegistration } from "./semesterRegistration.model"
import QueryBuilder from "../../app/builder/QueryBuilder"
import { registrationStatus } from "./semesterRegistration.constant"


const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration)=>{
   
    const academicSemester = payload?.academicSemester

    //check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
    const isThereAnyUpcomingOrOngoingSemester = await semesterRegistration.findOne({
        $or : [{status:registrationStatus.UPCOMING},{status:registrationStatus.ONGOING}]
    })
    if(isThereAnyUpcomingOrOngoingSemester){
        throw new AppError(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester`, '')
    }

     //check if AcademicSemester exist
    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)
    if(!isAcademicSemesterExist){
        throw new AppError(httpStatus.NOT_FOUND, 'academic semester not found', '')
    }

    //check is semester already registered
    const isSemesterRegistrationExist = await semesterRegistration.findOne({academicSemester})
    if(isSemesterRegistrationExist){
        throw new AppError(httpStatus.CONFLICT, 'this semester already registered', '')
    }

    const result = await semesterRegistration.create(payload)
    return result
 
}

const getAllSemesterRegistrationIntoDB = async(query: Record<string, unknown>)=>{
    const semesterRegistrationQuery = new QueryBuilder(semesterRegistration.find().
    populate('academicSemester'), query).
    filter().sort().paginate().fields()

    const result = await semesterRegistrationQuery.modelQuery
    return result
}

const getSingleSemesterRegistrationFromDB = async(id:string)=>{
    const result = await semesterRegistration.findById(id).populate('academicSemester')
    return result
}

const updateSemesterRegistrationFromDB = async(id:string, payload: Partial<TSemesterRegistration>)=>{

    //check if the requested registered semester is exist
    const isSemesterRegistrationExist = await semesterRegistration.findById(id)
    if(!isSemesterRegistrationExist){
        throw new AppError(httpStatus.NOT_FOUND, 'Semester not found', '')
    }

    //if the requester semester registration is ended we can not update anything
    const currentSemesterStatus = isSemesterRegistrationExist.status
    const requestedStatus = payload.status
    if(currentSemesterStatus === registrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`,'')      
    }

    //UPCOMING --> ONGOING --> ENDED
    if(currentSemesterStatus === registrationStatus.UPCOMING && requestedStatus === registrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST,
            `You can not change status from ${currentSemesterStatus} to ${requestedStatus}`, '')
    }

    if(currentSemesterStatus === registrationStatus.ONGOING && requestedStatus === registrationStatus.UPCOMING){
        throw new AppError(httpStatus.BAD_REQUEST,
            `You can not change status from ${currentSemesterStatus} to ${requestedStatus}`, '')
    }

    const result = await semesterRegistration.findByIdAndUpdate(id, payload,{
        new: true,
        runValidators: true
    })
    return result
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationIntoDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationFromDB
}