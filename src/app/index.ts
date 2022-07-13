import express from 'express'
import postRouter from '../post/post.router'
import { defaultErrorHandler } from './app.middleware'
import userRouter from '../user/user.router'
import authRouter from '../auth/auth.router'
import fileRouter from '../file/file.router'
import tagRouter from '../tag/tag.router'
import commentRouter from '../comment/comment.router'

const app = express()
app.use(express.json())
app.use(postRouter, userRouter, authRouter, fileRouter, tagRouter, commentRouter)
app.use(defaultErrorHandler)
export default app
