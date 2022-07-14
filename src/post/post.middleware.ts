import { Request, Response, NextFunction } from 'express'

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
