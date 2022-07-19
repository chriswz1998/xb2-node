import express from 'express'
import * as avatarController from './avatar.controller'
import { authGuard } from '../auth/auth.middlewar'
import { avatarInterceptor, avatarProcessor } from './avatar.middleware'

const router = express.Router()

router.post('/avatar', authGuard, avatarInterceptor, avatarProcessor, avatarController.store)
router.get('/avatar/:userId/', avatarController.serve)
router.get('/users/:userId/avatar')

export default router
