import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';


const router = express.Router();
//will call controller function
// router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch('/:id', validateRequest(updateStudentValidationSchema), StudentController.updateDtudent);
router.delete('/:id', StudentController.deleteStudent)

export const StudentRoutes = router;