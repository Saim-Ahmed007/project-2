import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { StudentValidations } from '../student/student.zod.validation';
import validateRequest from '../../app/middlewares/validateRequest';

const router = express.Router();


router.post('/create-student', validateRequest(StudentValidations.createStudentValidationSchema), UserController.createStudent);


export const UserRoutes = router