import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

const fileupload = multer({
    dest: 'uploads/'
})

export const fileInterceptor = fileupload.single('file')
