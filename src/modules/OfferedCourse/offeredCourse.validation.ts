import {z} from 'zod'
import { Days } from './offeredCourse.constant'
const timeStringSchema = z.string().refine((time)=>{
    const regex = /^([01]?[0-9])|2[0-3]:[0-5][0-9]$/
    return regex.test(time)
},{
    message: 'invalid time expected HH:MM in 24 hour format'
})
const createOfferedCourseValidationSchema = z.object({
    body : z.object({
        semesterRegistration : z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity : z.number(),
        section: z.number(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: timeStringSchema,
        endTime: timeStringSchema
    }).refine((body)=>{
        //start-time 10:30 1970-01-01T10:30
        //end-time 12:30 1970-01-01T12:30
        const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
    },{
        message: 'start time should be before end time'
    })
})

const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty : z.string(),
        maxCapacity : z.number(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: timeStringSchema,
        endTime: timeStringSchema       
    }).refine((body)=>{
        //start-time 10:30 1970-01-01T10:30
        //end-time 12:30 1970-01-01T12:30
        const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
    },{
        message: 'start time should be before end time'
    })
})

export const OfferedCourseValidationSchema = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}