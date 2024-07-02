import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async(payload : TOfferedCourse)=>{

    const {semesterRegistration, academicFaculty,academicDepartment,
        course,section,faculty,days,startTime,endTime} = payload
    //check if the registered semester id exist
    const isSemesterRegistrationExist = await SemesterRegistration.findById(semesterRegistration)
    if(!isSemesterRegistrationExist){
        throw new AppError(httpStatus.BAD_REQUEST, "semseter registration not found", '')
    }
    const academicSemester = isSemesterRegistrationExist.academicSemester
     //check if the academic faculty id exist
    const isacademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
    if(!isacademicFacultyExist){
        throw new AppError(httpStatus.BAD_REQUEST, "academic faculty not found", '')
    }
     //check if the academic department id exist
    const isacademicDepartmentExist = await AcademicDepartment.findById(academicDepartment)
    if(!isacademicDepartmentExist){
        throw new AppError(httpStatus.BAD_REQUEST, "academic faculty not found", '')
    }
     //check if the course id exist
    const isCourseExist = await Course.findById(course)
    if(!isCourseExist){
        throw new AppError(httpStatus.BAD_REQUEST, "course not found", '')
    }
     //check if the faculty id exist
    const isFacultyExist = await Faculty.findById(faculty)
    if(!isFacultyExist){
        throw new AppError(httpStatus.BAD_REQUEST, "faculty not found", '')
    }

    //check if the department is belong to the faculty
    const isAcademicDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
         academicfaculty : academicFaculty    
    })
    if(!isAcademicDepartmentBelongToFaculty){
        throw new AppError(httpStatus.BAD_REQUEST,
             `This ${isacademicDepartmentExist.name} is not belong to ${isacademicFacultyExist.name}`, '')
    }

    //check same offered course same section in the same registered semester exist
    const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection = await
    OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })
    if(isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection){
        throw new AppError(httpStatus.BAD_REQUEST,
             'Offered course with same section already exist', '')
    }

    //get the schedule of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: {$in : days},
    }).select('days startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }
   
   if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new AppError(httpStatus.CONFLICT,
        'The faculty is not availaible at that time please choose other day or time', ''
    )
   }

    const result = await OfferedCourse.create({...payload, academicSemester})
    return result 
}

const getOfferedCourseFromDB = async()=>{
    const result = OfferedCourse.find()
    return result
}

const getSingleOfferedCourseFromDB = async(id:string)=>{
    const result = OfferedCourse.findById(id)
    return result
}

const updateOfferedCourseIntoDB = async(id:string, 
    payload: Pick<TOfferedCourse , 'faculty'|'days'|'startTime'|'endTime'>)=>{

    const {faculty,days,startTime,endTime} = payload

    const isOfferedCourseExist = await OfferedCourse.findById(id)
    if(!isOfferedCourseExist){
        throw new AppError(httpStatus.BAD_REQUEST,
            'Offered course not found', '')
    }
    const isFacultyExist = await Faculty.findById(faculty)
    if(!isFacultyExist){
        throw new AppError(httpStatus.BAD_REQUEST,
            'faculty not found', '')
    }

    
     const semesterRegistration = isOfferedCourseExist.semesterRegistration
     const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)
     if(semesterRegistrationStatus?.status !== 'UPCOMING'){
        throw new AppError(httpStatus.BAD_REQUEST,
            `You can not update course as it is ${semesterRegistrationStatus?.status}`, '')
     }
      //get the schedule of the faculties
     const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: {$in : days},
    }).select('days startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }
   
   if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new AppError(httpStatus.CONFLICT,
        'The faculty is not availaible at that time please choose other day or time', ''
    )
   }
   const result = await OfferedCourse.findByIdAndUpdate(id, payload,{
    new: true
   })
   return result
}

const deleteOfferedCourseFromDB = async(id:string)=>{
    const isOfferedCourseExist = await OfferedCourse.findById(id)
    if(!isOfferedCourseExist){
        throw new AppError(httpStatus.CONFLICT,
            'You can not delete Offered course', ''
        )
    }
    const semesterRegistration = isOfferedCourseExist.semesterRegistration
    const semesterRegistrationStatus = await SemesterRegistration.
    findById(semesterRegistration).select('status')

    if(semesterRegistrationStatus?.status !== 'UPCOMING'){
        throw new AppError(httpStatus.BAD_REQUEST,
            `Offered course can not be update because of ${semesterRegistrationStatus}`,''
        )
    }

    if(semesterRegistrationStatus?.status === 'UPCOMING'){
        const deleteOfferedCourse = await OfferedCourse.findByIdAndDelete(id)
        const result = await SemesterRegistration.findByIdAndDelete(deleteOfferedCourse)
        return result
    }

}

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
    deleteOfferedCourseFromDB
}