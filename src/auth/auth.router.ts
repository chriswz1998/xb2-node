import express from 'express'
import * as authController from './auth.conntroller'
import { authGuard, validateLoginDate } from './auth.middlewar'

const router = express.Router()

router.post('/login', validateLoginDate, authController.login)
router.post('/auth/validate', authGuard, authController.validate)

export default router
