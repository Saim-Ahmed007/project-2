import {z} from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const GurdianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const createStudentValidationSchema = z.object({
  body : z.object({
    password : z.string().max(20),
    student : z.object({
    name: UserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    email: z.string().email(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    gurdian: GurdianValidationSchema,
    admissionSemester: z.string(),
    profileImage: z.string().optional(),
    })
  })
});

export const  StudentValidations ={
   createStudentValidationSchema
} 
  