import express from 'express'

import * as tagController from './tag.controller'
import { authGuard } from '../auth/auth.middlewar'

const router = express.Router()

router.post('/tags', authGuard, tagController.store)

export default router
