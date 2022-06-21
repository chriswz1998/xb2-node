import { Request, Response, NextFunction } from 'express'
import { signToken } from './auth.service'

export const login = async (request: Request, response: Response, next: NextFunction) => {
    const {user: {id, name}} = request.body
    const payload = {id, name}
    try {
        const token = signToken({payload})
        response.send({id, name, token})
    } catch (e) {
        next(e)
    }
}

export const validate = async (request: Request, response: Response, next: NextFunction) => {
    response.sendStatus(200)
}
