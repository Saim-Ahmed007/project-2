import express from 'express'
import validateRequest from '../../app/middlewares/validateRequest'
import { CourseValidations } from './course.validation'
import { CourseController } from './course.controller'
import auth from '../../app/middlewares/auth'

const router = express.Router()

router.post('/create-course' , auth('admin'), validateRequest(CourseValidations.createCourseValidationSchema),
CourseController.createCourse)

router.get('/', CourseController.getCourse)

router.get('/:id', CourseController.getSingleCourse)

router.patch('/:id', auth('admin'), validateRequest(CourseValidations.courseUpdateValidationSchema),
CourseController.updateCourse)

router.put('/:courseId/assign-faculties',auth('admin'), validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseController.assignFacultiesWithCourse)

router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema),auth('admin'), CourseController.removeFacultiesFromCourse)

router.delete('/:id',auth('admin'), CourseController.deleteCourse)

export const CourseRoutes = router