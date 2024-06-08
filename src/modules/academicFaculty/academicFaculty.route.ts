import  express  from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router()

router.post('/create-academic-faculty', 
validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema),
 academicFacultyController.createFaculty)

router.get('/faculties', academicFacultyController.getAllAcademicFaculties)

router.get('/:facultyID', academicFacultyController.getSingleFaculty)

router.patch('/:facultyID',
validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), 
academicFacultyController.updateFaculty)

export const AcademicFacultyRoutes = router

