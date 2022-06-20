import express from 'express'
import * as authController from './auth.conntroller'
import { validateLoginDate } from './auth.middlewar'

const router = express.Router()

router.post('/login',validateLoginDate, authController.login)

export default router
