import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = express.Router()
router.get('/',FacultyController.getAllFaculty)
router.get('/:id', FacultyController.getSingleFaculty)
router.patch('/:id', validateRequest(facultyValidations.updateFacultyValidationSchema),
 FacultyController.updateFaculty)
router.delete('/:id', FacultyController.deleteFaculty)

export const FacultyRoutes = router