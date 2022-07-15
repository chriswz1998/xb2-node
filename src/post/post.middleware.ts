import { Request, Response, NextFunction } from 'express'
import { POSTS_PRE_PAGE } from '../app/app.config'

export const sort = async (request: Request, response: Response, next: NextFunction) => {
    const {sort} = request.query
    let sqlSort: string
    switch (sort) {
        case 'earliest':
            sqlSort = 'post.id asc'
            break
        case 'latest':
            sqlSort = 'post.id desc'
            break
        case 'most_comments':
            sqlSort = 'totalComments desc, post.id desc'
            break
        default:
            sqlSort = 'post.id desc'
            break
    }
    request.sort = sqlSort
    next()
}

export const filter = async (request: Request, response: Response, next: NextFunction) => {
    const {tag, user, action} = request.query
    request.filter = {
        name: 'default',
        sql: 'post.id not null'
    }

    if (tag && !user && !action) {
        request.filter = {
            name: 'tagName',
            sql: 'tag.name = ?'
        }
    }

    if (user && action == 'published' && !tag) {
        request.filter = {
            name: 'userPublished',
            sql: 'user.id = ?',
            param: user as string
        }
    }

    next()
}

export const paginate = async (request: Request, response: Response, next: NextFunction) => {
    const {page = 1} = request.query
    const limit = parseInt(POSTS_PRE_PAGE, 10) || 30
    const offset = limit * (page as number - 1)
    request.pagination = {limit, offset}
    next()
}
