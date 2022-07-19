import { Request, Response, NextFunction } from 'express'
import multer, { FileFilterCallback } from 'multer'
import Jimp from 'jimp'
import path from 'path'

const avatarUpLoad = multer({
    dest: 'uploads/avatar',
    fileFilter(req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
        const typeList = ['image/png', 'image/jpg', 'image/jpeg']
        const allowed = typeList.some(type => type === file.mimetype)
        if (allowed) {
            callback(null, true)
        } else {
            callback(new Error('FILE_TYPE_NOT_ACCEPT'))
        }
    }
})

export const avatarInterceptor = avatarUpLoad.single('avatar')


export const avatarProcessor = async (request: Request, response: Response, next: NextFunction) => {
    const {file} = request

    const filepath = path.join(file.destination, 'resized', file.filename)

    try {
        const image = await Jimp.read(file.path)
        image.cover(256, 256).quality(85).write(`${filepath}-large`)
        image.cover(128, 128).quality(85).write(`${filepath}-medium`)
        image.cover(64, 64).quality(85).write(`${filepath}-small`)
    } catch (e) {
        next(e)
    }
    next()
}
