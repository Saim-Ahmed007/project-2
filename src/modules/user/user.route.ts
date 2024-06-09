import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { StudentValidations } from '../student/student.zod.validation';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { FacultyController } from '../Faculty/faculty.controller';
import { AdminValidations } from '../Admin/admin.validation';

const router = express.Router();


router.post('/create-student', validateRequest(StudentValidations.createStudentValidationSchema), UserController.createStudent);

router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema),
UserController.createFaculty);

router.post('/create-admin',validateRequest(AdminValidations.createAdminValidationSchema),
UserController.createAdmin)


export const UserRoutes = router