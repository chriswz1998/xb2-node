import { TagModel } from './tag.model'
import { connection } from '../app/database/mysql'

export const createTag = async (tag: TagModel) => {
    const statement = `
        insert into tag
        set ?
    `
    const [data] = await connection.promise().query(statement, tag)
    return data as any
}

export const getTagByName = async (tagName: string) => {
    const statement = `
        select id, name from tag
        where name = ?
    `
    const [data] = await connection.promise().query(statement, tagName)
    return data[0]
}
