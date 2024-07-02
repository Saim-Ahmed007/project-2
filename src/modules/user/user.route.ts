import express from 'express';
import { UserController } from './user.controller';
import { StudentValidations } from '../student/student.zod.validation';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validation';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();


router.post('/create-student', auth(USER_ROLE.admin), validateRequest(StudentValidations.createStudentValidationSchema), UserController.createStudent);

router.post('/create-faculty',auth(USER_ROLE.admin), validateRequest(facultyValidations.createFacultyValidationSchema),
UserController.createFaculty);

router.post('/create-admin',validateRequest(AdminValidations.createAdminValidationSchema),
UserController.createAdmin)


export const UserRoutes = router