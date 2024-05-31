import express from 'express';
import { StudentController } from './student/student.controller';

const router = express.Router();
//will call controller function
// router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getStudents);
router.get('/:studentID', StudentController.getSingleStudent);
router.delete('/:studentID', StudentController.deleteStudent)

export const StudentRoutes = router;
