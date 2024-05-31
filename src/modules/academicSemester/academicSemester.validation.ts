import {z} from 'zod';
import { Months, academicSemesterCode, academicSemesterName } from './academicSemester.constant';
import { TAcademicSemesterName } from './academicSemester.interface';
import { string } from 'joi';

const createAcademicSemesterValidationSchema = z.object({
  body : z.object({
  name : z.enum([...academicSemesterName] as [string, ...string[]]),
  code: z.enum([...academicSemesterCode] as [string, ...string[]]),
  year: z.string(),
  startMonth : z.enum([...Months] as [string, ...string[]]),
  endMonth : z.enum([...Months] as [string, ...string[]]),
  }),  
})

const updateAcademicSemesterValidationSchema = z.object({
  body : z.object({
    name : z.enum([...academicSemesterName] as [string, ...string[]]).optional(),
    code : z.enum([...academicSemesterCode] as [string, ...string[]]).optional(),
    year : z.string().optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth : z.enum([...Months] as [string, ...string[]]).optional(),

  })
})

export const AcademicSemesterValidations = {
     createAcademicSemesterValidationSchema,
     updateAcademicSemesterValidationSchema
}
