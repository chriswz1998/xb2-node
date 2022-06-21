import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import * as userService from '../user/user.service'
import jwt from 'jsonwebtoken'
import { PUBLIC_KEY } from '../app/app.config'

export const validateLoginDate = async (request: Request, response: Response, next: NextFunction) => {
    console.log('👮‍ 验证登录数据')
    const {name, password} = request.body
    //校验必填数据
    if (!name) return next(new Error('NAME_IS_REQUIRED'))
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED'))

    //验证用户名,密码
    const user = await userService.getUsersByName(name, {password: true})
    if (!user) return next(new Error('USER_DOES_NOT_EXIT'))
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'))
    request.body.user = user
    next()
}

export const authGuard = (request: Request, response: Response, next: NextFunction) => {
    console.log('👮‍ 验证用户身份')
    try {
        const authorization = request.header('Authorization')
        if (!authorization) throw new Error()
        const token = authorization.replace('Bearer ', '')
        if (!token) throw new Error()
        jwt.verify(token, PUBLIC_KEY, {algorithms: ['RS256']})
        next()
    } catch (e) {
        next(new Error('UNAUTHORIZED'))
    }
}
