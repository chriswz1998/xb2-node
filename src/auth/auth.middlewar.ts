import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import * as authService from './auth.service'
import * as userService from '../user/user.service'

export const validateLoginDate = async (request: Request, response: Response, next: NextFunction) => {
    console.log('👮‍ 验证登录数据')
    const {name, password} = request.body
    if (!name) return next(new Error('NAME_IS_REQUIRED'))
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED'))
    const user = await userService.getUsersByName(name, {password: true})
    console.log(password)
    console.log(user)
    if (!user) return next(new Error('USER_DOES_NOT_EXIT'))
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'))
    next()
}
