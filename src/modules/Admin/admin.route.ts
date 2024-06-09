import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../app/middlewares/validateRequest'
import { AdminValidations } from './admin.validation'

const router = express.Router()
router.get('/', AdminController.getAllAdmin)
router.get('/:id', AdminController.getSingleAdmin)
router.patch('/:id', validateRequest(AdminValidations.updateAdminValidationSchema),
 AdminController.updateAdmin)
router.delete('/:id', AdminController.deleteAdmin)

export const AdminRoutes = router