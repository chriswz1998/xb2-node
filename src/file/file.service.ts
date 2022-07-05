import { connection } from '../app/database/mysql'
import { FileModel } from './file.model'


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
    return data
}
