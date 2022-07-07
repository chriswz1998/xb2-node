import express from 'express'
import * as fileController from './file.controller'
import { authGuard } from '../auth/auth.middlewar'
import { fileInterceptor, fileProcessor } from './file.middleware'

const router = express.Router()

router.post('/files', authGuard, fileInterceptor, fileProcessor, fileController.store)

router.get('/files/:fileId/serve', fileController.serve)

router.get('/files/:fileId/metadata', fileController.metadata)
export default router
