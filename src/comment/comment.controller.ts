import { Request, Response, NextFunction } from 'express'
import { createComment, deleteComment, isReplyComment, updateComment } from './comment.service'

export const store = async (request: Request, response: Response, next: NextFunction) => {
    const {id: userId} = request.user
    const {content, postId} = request.body

    const comment = {
        content,
        postId,
        userId
    }

    try {
        const data = await createComment(comment)
        response.status(201).send(data)
    } catch (e) {
        next(e)
    }
}

export const reply = async (request: Request, response: Response, next: NextFunction) => {
    const {commentId} = request.params
    const {id: userId} = request.user
    const {content, postId} = request.body

    const comment = {
        content,
        postId,
        userId,
        parentId: parseInt(commentId, 10)
    }
    try {
        const reply = await isReplyComment(parseInt(commentId, 10))
        if (reply) return next(new Error('UNABLE_TO_REPlY_THIS_COMMENT'))
        console.log('🚀 ~ file: comment.controller.ts ~ line 36 ~ reply ~ reply', reply)
    } catch (e) {
        return next(e)
    }
    try {
        const data = await createComment(comment)
        console.log('🚀 ~ file: comment.controller.ts ~ line 41 ~ reply ~ data', data)
        response.status(201).send(data)
    } catch (e) {
        next(e)
    }
}

export const update = async (request: Request, response: Response, next: NextFunction) => {
    const {commentId} = request.params
    const {content} = request.body
    const comment = {
        id: parseInt(commentId, 10),
        content
    }
    console.log('🚀 ~ file: comment.controller.ts ~ line 56 ~ update ~ comment', comment)
    try {
        const data = await updateComment(comment)
        response.send(data)
    } catch (e) {
        next(e)
    }
}

export const destroy = async (request: Request, response: Response, next: NextFunction) => {
    const {commentId} = request.params
    try {
        const data = await deleteComment(parseInt(commentId, 10))
        response.send(data)
    } catch (e) {
        next(e)
    }
}

