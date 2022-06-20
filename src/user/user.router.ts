import express from 'express'
import * as userController from './user.controller'
import { hashPassword, validateUserDate } from './user.middleware'

const router = express.Router()

router.post('/users', validateUserDate, hashPassword, userController.store)

export default router
