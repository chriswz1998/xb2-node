import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { createFile, findFileById } from './file.service'
import { FileModel } from './file.model'
import path from 'path'
import * as fs from 'fs'

export const store = async (request: Request, response: Response, next: NextFunction) => {
    const {id: userId} = request.user
    console.log('🚀 ~ file: file.controller.ts ~ line 9 ~ store ~ userId', userId)

    const {post: postId} = request.query
    const fileInfo = _.pick(request.file, [
        'originalname',
        'mimetype',
        'filename',
        'size'
    ])
    try {
        // @ts-ignore
        const data = await createFile({...fileInfo, userId, postId, ...request.fileMetaData})
        response.status(201).send(data)
    } catch (e) {
        next(e)
    }
}

export const serve = async (request: Request, response: Response, next: NextFunction) => {
    const {fileId} = request.params

    try {
        const file = await findFileById(parseInt(fileId, 10)) as unknown as FileModel
        const {size} = request.query
        let filename = file.filename
        let root = 'uploads'
        let resized = 'resized'

        if (size) {
            const imageSize = ['large', 'medium', 'thumbnail']
            if (!imageSize.some(item => item === size)) {
                throw new Error('FILE_NOT_FOUND')
            }

            const fileExit = fs.existsSync(path.join(root, resized, `${filename}-${size}`))

            if (fileExit) {
                filename = `${filename}-${size}`
                root = path.join(root, resized)
            }
        }

        response.sendFile(filename, {
                root,
                headers: {
                    'Content-Type': file.mimetype
                }
            }
        )
    } catch (e) {
        next(e)
    }
}

export const metadata = async (request: Request, response: Response, next: NextFunction) => {
    const {fileId} = request.params
    try {
        const file = await findFileById(parseInt(fileId, 10))
        const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata'])
        response.send(data)
    } catch (e) {
        next(e)
    }
}
