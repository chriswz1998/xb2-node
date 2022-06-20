import express from 'express'
import postRouter from '../post/post.router'
import { defaultErrorHandler } from './app.middleware'
import userRouter from '../user/user.router'
import authRouter from '../auth/auth.router'

const app = express()
app.use(express.json())
app.use(postRouter, userRouter, authRouter)
app.use(defaultErrorHandler)
export default app
