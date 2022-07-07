import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import Jimp from 'jimp'
import { imageResize } from './file.service'

const fileUpLoad = multer({
    dest: 'uploads/'
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
