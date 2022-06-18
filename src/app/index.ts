import express from 'express'
import postRouter from '../post/post.router'
import { defaultErrorHandler } from './app.middleware'

const app = express()
app.use(express.json())
app.use(postRouter)
app.use(defaultErrorHandler)
export default app
