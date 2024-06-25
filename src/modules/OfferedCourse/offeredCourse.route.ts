import express from 'express'
import { OfferedCourseController } from './offeredCourse.controller'
import validateRequest from '../../app/middlewares/validateRequest'
import { OfferedCourseValidationSchema } from './offeredCourse.validation'
const router = express.Router()

router.post('/create-offered-course',validateRequest(OfferedCourseValidationSchema.createOfferedCourseValidationSchema), OfferedCourseController.createOfferedCourse)

router.get('/',OfferedCourseController.getOfferedCourse)

router.get('/:id', OfferedCourseController.getSingleOfferedCourse)

router.patch('/:id',validateRequest(OfferedCourseValidationSchema.updateOfferedCourseValidationSchema),
    OfferedCourseController.updateOfferedCourse)

router.delete(':id', OfferedCourseController.deleteOfferedCourse)

export const OfferedCourseRoutes = router