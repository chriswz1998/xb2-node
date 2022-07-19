import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { createAvatar, findAvatarByUserId } from './avatar.service'
import { AvatarModel } from './avatar.model'
import path from 'path'
import * as fs from 'fs'

export const store = async (request: Request, response: Response, next: NextFunction) => {
    response.sendStatus(200)
    const {id: userId} = request.user
    const fileInfo = _.pick(request.file, ['mimetype', 'filename', 'size'])
    try {
        const data = await createAvatar({...fileInfo, userId})
        response.status(201).send(data)
    } catch (e) {
        next(e)
    }
}

export const serve = async (request: Request, response: Response, next: NextFunction) => {
    const {userId} = request.params
    try {
        const avatar = await findAvatarByUserId(parseInt(userId, 10)) as AvatarModel
        if (!avatar) throw new Error('FILE_NOT_FOUND')

        const {size} = request.query
        let filename = avatar.filename
        let root = path.join('uploads', 'avatar')
        let resized = 'resized'

        if (size) {
            const imageSize = ['large', 'medium', 'small']
            if (!imageSize.some(item => item === size)) throw new Error('FILE_NOT_FOUND')

            const fileExit = fs.existsSync(path.join(root, resized, `${filename}-${size}`))
            if (!fileExit) throw new Error('FILE_NOT_FOUND')
            if (fileExit) {
                filename = `${filename}-${size}`
                root = path.join(root, resized)
            }
        }

        response.sendFile(filename, {
            root,
            header: {
                'Content-Type': avatar.mimetype
            }
        })
    } catch (e) {
        next()
    }
}
