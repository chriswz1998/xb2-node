import { Request, Response, NextFunction } from 'express'
import { getPosts } from './post.service'

export const index = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization !== 'asa') {
        return next(new Error())
    }
    res.send(getPosts())
}
