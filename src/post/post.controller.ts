import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import {
    createPost,
    createPostTag,
    deletePost,
    deletePostTag,
    getPosts,
    postHasTag,
    updatePost
} from './post.service'
import { TagModel } from '../tag/tag.model'
import { createTag, getTagByName } from '../tag/tag.service'

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await getPosts({sort: req.sort, filter: req.filter})
        res.send(posts)
    } catch (e) {
        next(e)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    const {title, content} = req.body
    const {id: userId} = req.user

    try {
        const data = await createPost({title, content, userId})
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

export const storePostTag = async (request: Request, response: Response, next: NextFunction) => {
    const {postId} = request.params
    const {name} = request.body
    if (!name) return response.status(404).send('要写报文的！🦕')
    let tag: TagModel
    try {
        tag = await getTagByName(name)
    } catch (e) {
        next(e)
    }
    if (tag) {
        try {
            const postTag = await postHasTag(parseInt(postId, 10), tag.id)
            if (postTag) return next(new Error('POST_ALREADY_HAS_THIS_TAG'))
        } catch (e) {
            return next(e)
        }
    }

    if (!tag) {
        try {
            const data = await createTag({name})
            tag = {id: data.insertId}
        } catch (e) {
            return next(e)
        }
    }

    try {
        await createPostTag(parseInt(postId, 10), tag.id)
        response.sendStatus(201)
    } catch (e) {
        next(e)
    }
}

export const destroyPostTag = async (request: Request, response: Response, next: NextFunction) => {
    const {postId} = request.params
    const {tagId} = request.body
    try {
        await deletePostTag(parseInt(postId, 10), tagId)
        response.sendStatus(200)
    } catch (e) {
        next(e)
    }
}
