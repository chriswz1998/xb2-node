import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { createPost, deletePost, getPosts, updatePost } from './post.service'

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await getPosts()
        res.send(posts)
    } catch (e) {
        next(e)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    const {title, content} = req.body
    if (!title) {
        res.status(201).send('title不能为空')
        return
    }
    if (!content) {
        res.status(201).send('content不能为空')
        return
    }
    try {
        const data = await createPost({title, content})
        res.status(201).send(data)
    } catch (e) {
        next(e)
    }

}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const {postId} = req.params
    const post = _.pick(req.body, ['title', 'content'])
    try {
        const data = await updatePost(parseInt(postId, 10), post)
        res.send(data)
    } catch (e) {
        next(e)
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const {postId} = req.params
    try {
        const data = await deletePost(parseInt(postId, 10))
        res.send(data)
    } catch (e) {
        next(e)
    }
}
