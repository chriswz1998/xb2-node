import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import * as userService from './user.service'

export const validateUserDate = async (request: Request, response: Response, next: NextFunction) => {
    console.log('👮‍ 验证用户数据')
    const {name, password} = request.body
    if (!name) return next(new Error('NAME_IS_REQUIRED'))
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED'))
    const user = await userService.getUsersByName(name)
    if (user) return next(new Error('USER_ALREADY_EXIT'))
    next()
}

export const hashPassword = async (request: Request, response: Response, next: NextFunction) => {
    const {password} = request.body
    request.body.password = await bcrypt.hash(password, 10)
    next()
}
