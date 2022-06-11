import express from 'express'
import postRouter from '../post/post.router'
import { defaultErrorHandler } from './app.middleware'

const app = express()
app.use(express.json())
app.use(defaultErrorHandler)
app.use(postRouter)
export default app
