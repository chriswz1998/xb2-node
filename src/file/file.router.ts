import express from 'express'
import * as fileController from './file.controller'
import { authGuard } from '../auth/auth.middlewar'
import { fileInterceptor } from './file.middleware'

const router = express.Router()

router.post('/files', authGuard, fileInterceptor, fileController.store)

router.get('/files/:fileId/serve', fileController.serve)

export default router
