import { Request, Response, NextFunction } from 'express'
import multer, { FileFilterCallback } from 'multer'
import Jimp from 'jimp'
import { imageResize } from './file.service'

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback, typeList?: Array<string>) => {
    if (!typeList) typeList = ['image/png', 'image/jpg', 'image/jpeg']
    const allowed = typeList.some(type => type === file.mimetype)
    if (allowed) {
        callback(null, true)
    } else {
        callback(new Error('FILE_TYPE_NOT_ACCEPT'))
    }
}

const fileUpLoad = multer({
    dest: 'uploads/',
    fileFilter
})

export const fileInterceptor = fileUpLoad.single('file')

export const fileProcessor = async (request: Request, response: Response, next: NextFunction) => {
    const {path} = request.file
    let image: Jimp
    try {
        image = await Jimp.read(path)
    } catch (e) {
        next(e)
    }

    const {imageSize: {width, height}, tags} = image['_exif']

    request.fileMetaData = {
        height,
        width,
        metadata: JSON.stringify(tags)
    }

    imageResize(image, request.file)

    next()
}
