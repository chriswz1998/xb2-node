import express from 'express'
import { accessControl, authGuard } from '../auth/auth.middlewar'
import * as commentController from './comment.controller'

const router = express.Router()

router.post('/comments', authGuard, commentController.store)
router.post('/comments/:commentId/reply', authGuard, commentController.reply)
router.patch('/comments/:commentId', authGuard, accessControl({possession: true}), commentController.update)
router.delete('/comments/:commentId', authGuard, accessControl({possession: true}), commentController.destroy)
export default router
