import mongoose from "mongoose"
import QueryBuilder from "../../app/builder/QueryBuilder"
import { courseSearchableFields } from "./course.constant"
import { TCourse, TCoursefaculties } from "./course.interface"
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../app/errors/AppError"
import httpStatus from "http-status"

const createCourseIntoDB = async(payload:TCourse)=>{
    const result = await Course.create(payload)
    return result
}

const getAllCourseIntoDB = async(query:Record<string, unknown>)=>{
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query).
    search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = await courseQuery.modelQuery
    return result
}
const getSingleCourseIntoDB = async(id:string)=>{
    const result = await Course.findById(id)
    return result
}

const updateCourseIntoDB = async(id:string, payload:Partial<TCourse>)=>{

    const {preRequisiteCourses, ...courseRemainingData} = payload

    const session = await mongoose.startSession()

    try{
    session.startTransaction()

    //step 01 - update basic course info
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData,
        {
            new: true,
            runValidators: true,
            session
        }
    )
    if(!updateBasicCourseInfo){
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course', '')
    }
    //check if there any pre requisite course to update
    if(preRequisiteCourses && preRequisiteCourses.length > 0){
        //filter out the deleted fields
        const deletedPreRequisites = preRequisiteCourses.filter((el)=>el.course && el.isDeleted).
        map((el)=>el.course)
        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
            $pull : {preRequisiteCourses : {course : {$in : deletedPreRequisites}}}
        },{
            new: true,
            runValidators: true,
            session

        })

        if(!deletedPreRequisiteCourses){
            throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course', '')
        }

        //filter out new pre requisite course
        const newPreRequisites = preRequisiteCourses?.filter((el)=> el.course && !el.isDeleted)

        const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $addToSet : {preRequisiteCourses : {$each : newPreRequisites}}
    },{
        new: true,
        runValidators: true,
        session
    }) 

    if(!newPreRequisiteCourses){
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course', '')
    }
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
    }
    await session.commitTransaction()
    await session.endSession()

    }catch(error){
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course', '')   
    }
     
}
const deleteCourseFromDB = async(id:string)=>{
    const result = await Course.findByIdAndUpdate(id,
         {isDeleted:true},
         {new:true}
        )
    return result
}

const assignFacultiesWithCourseIntoDB = async(id:string, payload:TCoursefaculties)=>{
    const result = await CourseFaculty.findByIdAndUpdate(id,
        {
            course: id,
            $addToSet : {faculties : {$each : payload}}
        },{
            upsert : true,
            new : true
        }
    )
    return result
}

const removeFacultiesFromCourseFromDB = async(id:string, payload:TCoursefaculties)=>{
    const result = await CourseFaculty.findByIdAndUpdate(id,
        {
            $pull : {faculties : {$in: payload}}
        },{
            
            new : true
        }
    )
    return result
}

export const courseServices = {
    createCourseIntoDB,
    getAllCourseIntoDB,
    getSingleCourseIntoDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseFromDB,
    deleteCourseFromDB

}