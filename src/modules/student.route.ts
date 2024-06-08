import express from 'express';
import { StudentController } from './student/student.controller';
import { valid } from 'joi';
import validateRequest from '../app/middlewares/validateRequest';
import StudentModel from './student.model';
import {updateStudentValidationSchema } from './student/student.zod.validation';

const router = express.Router();
//will call controller function
// router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getStudents);
router.get('/:studentID', StudentController.getSingleStudent);
router.patch('/:studentID', validateRequest(updateStudentValidationSchema), StudentController.updateDtudent);
router.delete('/:studentID', StudentController.deleteStudent)

export const StudentRoutes = router;
