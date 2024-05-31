import  express from "express"
import { AcademicSemseterController } from "./academicSemester.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { AcademicSemesterValidations } from './academicSemester.validation';

const route = express.Router()

route.post('/create-academic-semester',
validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
AcademicSemseterController.createAcademicSemester)

route.get('/get-academic-semester', AcademicSemseterController.getAcademicSemester)

route.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemseterController.updateSingleAcademicSemester,
  );

  route.get('/:semesterId',AcademicSemseterController.getSingleAcademicSemester)

export const academicSemesterRoutes = route;

