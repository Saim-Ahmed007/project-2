import express from 'express'
import validateRequest from '../../app/middlewares/validateRequest'
import { CourseValidations } from './course.validation'
import { CourseController } from './course.controller'

const router = express.Router()

router.post('/create-course' , validateRequest(CourseValidations.createCourseValidationSchema),
CourseController.createCourse)

router.get('/', CourseController.getCourse)

router.get('/:id', CourseController.getSingleCourse)

router.patch('/:id', validateRequest(CourseValidations.courseUpdateValidationSchema),
CourseController.updateCourse)

router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseController.assignFacultiesWithCourse)

router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseController.removeFacultiesFromCourse)

router.delete('/:id', CourseController.deleteCourse)

export const CourseRoutes = router