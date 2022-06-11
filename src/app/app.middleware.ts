import { Request, Response, NextFunction } from 'express'

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url)
    next()
}

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number, message: string
    switch (error.message) {
        default:
            statusCode = 500
            message = '服务器暂时出了点小问题～～😄'
            break
    }
    res.statusCode = statusCode
    res.send({message})
}
