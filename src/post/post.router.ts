import express from 'express'

import * as postController from './post.controller'
import { requestUrl } from '../app/app.middleware'
import { accessControl, authGuard } from '../auth/auth.middlewar'

const router = express.Router()

router.get('/posts', requestUrl, postController.index)

router.post('/posts', authGuard, postController.store)

router.patch('/posts/:postId', authGuard, accessControl({possession: true}), postController.update)

router.delete('/posts/:postId', authGuard, accessControl({possession: true}), postController.destroy)
export default router
