import { Schema, model } from "mongoose";
import { TCourse, TCoursefaculties, TPreRequisiteCourse } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {type: String, required:true, trim:true, unique:true},
    prefix: {type: String, required:true, trim:true},
    code: {type: Number, required:true, trim:true},
    credits: {type: Number, required:true, trim:true},
   
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted:{
        type: Boolean,
        default: false
    },
})



export const Course = model<TCourse>('Course', courseSchema)

const courseFacultySchema = new Schema<TCoursefaculties>({
   course : {
    type : Schema.Types.ObjectId,
    ref : 'Course',
    unique: true
   },
   faculties : [{
    type : Schema.Types.ObjectId,
    ref : 'Faculty'
   }] 
})

export const CourseFaculty = model<TCoursefaculties>('CourseFaculty', courseFacultySchema)