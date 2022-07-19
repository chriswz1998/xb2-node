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
        case 'UNAUTHORIZED':
            statusCode = 401
            message = '请先登录'
            break
        case 'USER_DOES_NOT_OWN_RESOURCE':
            statusCode = 403
            message = '不能处理这个内容'

            break
        case 'FILE_NOT_FOUND':
            statusCode = 404
            message = '文件不存在'
            break
        case 'TAG_ALREADY_EXITS':
            statusCode = 400
            message = '标签已存在'
            break
        case 'POST_ALREADY_HAS_THIS_TAG':
            statusCode = 400
            message = '内容已经有这个标签'
            break
        case 'UNABLE_TO_REPlY_THIS_COMMENT':
            statusCode = 400
            message = '无法评论这个信息'
            break
        case 'FILE_TYPE_NOT_ACCEPT':
            statusCode = 400
            message = '该类型文件不能上传❌'
            break
        default:
            statusCode = 500
            message = '服务器暂时出了点小问题～～😄'
            break
    }
    response.status(statusCode).send(message)
}
