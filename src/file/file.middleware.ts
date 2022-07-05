import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

const fileUpLoad = multer({
    dest: 'uploads/'
})

export const fileInterceptor = fileUpLoad.single('file')
