import express from 'express'
import validateRequest from '../../app/middlewares/validateRequest'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'
import { semesterRegistrationController } from './semesterRegistration.controller'

const router = express.Router()

router.post('/create-semester-registration', validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),semesterRegistrationController.createSemesterRegistration)

router.get('/', semesterRegistrationController.getAllSemesterRegistration)

router.get('/:id', semesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id', validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),semesterRegistrationController.updateSemesterRegistration)

export const semesterRegistrationRoutes = router