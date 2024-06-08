import express from 'express';
import { academicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post('/create-academic-department',
//  validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
  academicDepartmentController.createAcademicDepartment);
router.get('/departments', academicDepartmentController.getAcademicDepartment);
router.get('/:departmentID',academicDepartmentController.getSingleAcademicDepartment);
router.patch('/:departmentID', validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartmentController.updateAcademicDepartment);

export const AcademicDepartmentRoutes = router


