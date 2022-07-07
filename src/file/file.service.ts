import { connection } from '../app/database/mysql'
import { FileModel } from './file.model'
import Jimp from 'jimp'
import path from 'path'


export const createFile = async (file: FileModel) => {
    const statement = `
        insert into file
        set ?
    `
    const [data] = await connection.promise().query(statement, file)
    return data
}

export const findFileById = async (fileId: number) => {
    const statement = `
    select * from file
    where id = ?
  `
    const [data] = await connection.promise().query(statement, fileId)
    return data[0]
}

export const imageResize = (image: Jimp, file: Express.Multer.File) => {
    const {imageSize: {width}} = image['_exif']

    const filepath = path.join(file.destination, 'resized', file.filename)

    if (width > 1280) {
        image.resize(1280, Jimp.AUTO).quality(85).write(`${filepath}-large`)
    }
    if (width > 640) {
        image.resize(640, Jimp.AUTO).quality(85).write(`${filepath}-medium`)
    }
    if (width > 320) {
        image.resize(320, Jimp.AUTO).quality(85).write(`${filepath}-thumbnail`)
    }
}
