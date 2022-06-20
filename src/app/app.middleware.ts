import { Request, Response, NextFunction } from 'express'

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url)
    next()
}

export const defaultErrorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error.message) console.log('🚧', error.message)
    let statusCode: number, message: string
    switch (error.message) {
        case 'NAME_IS_REQUIRED':
            statusCode = 400
            message = '请提供用户名'
            break
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 400
            message = '请提供密码'
            break
        case 'USER_ALREADY_EXIT':
            statusCode = 409
            message = '用户名已存在'
            break
        case 'USER_DOES_NOT_EXIT':
            statusCode = 400
            message = '用户不存在'
            break
        case 'PASSWORD_DOES_NOT_MATCH':
            statusCode = 400
            message = '密码错误'
            break
        default:
            statusCode = 500
            message = '服务器暂时出了点小问题～～😄'
            break
    }
    response.status(statusCode).send(message)
}
