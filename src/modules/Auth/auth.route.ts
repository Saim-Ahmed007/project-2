import express from 'express'
import validateRequest from '../../app/middlewares/validateRequest'
import { AuthValidationSchema } from './auth.validation'
import { AuthController } from './auth.controller'
import auth from '../../app/middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post('/login', validateRequest(AuthValidationSchema.loginValidationSchema), 
    AuthController.loginUsers)

router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(AuthValidationSchema.changePasswordValidationSchema), 
    AuthController.changePassword)

router.post('/refresh-token', validateRequest(AuthValidationSchema.refreshTokenValidationSchema),
    AuthController.refreshToken )

export const AuthRoutes = router