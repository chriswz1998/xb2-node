import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { createFile, findFileById } from './file.service'
import { FileModel } from './file.model'
import path from 'path'

export const store = async (request: Request, response: Response, next: NextFunction) => {
    const {id: userId} = request.user

    const {post: postId} = request.query
    const fileInfo = _.pick(request.file, [
        'originalname',
        'mimetype',
        'filename',
        'size'
    ])
    try {
        // @ts-ignore
        const data = await createFile({...fileInfo, userId, postId})
        response.status(201).send(data)
    } catch (e) {
        next(e)
    }
}

export const serve = async (request: Request, response: Response, next: NextFunction) => {
    const {fileId} = request.params

    try {
        const file = await findFileById(parseInt(fileId, 10)) as unknown as FileModel
        response.sendFile(file.filename, {
                root: path.join('uploads'),
                headers: {
                    'Content-Type': file.mimetype
                }
            },
            (a) => {
                console.log('🚀 ~ file: file.controller.ts ~ line 38 ~ a ~ ', a)
            }
        )
    } catch (e) {
        next(e)
    }
}
