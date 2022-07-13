import { connection } from '../app/database/mysql'
import { CommentModel } from './comment.model'

export const createComment = async (comment: CommentModel) => {
    const statement = `
        insert into comment
        set ?
    `
    const [data] = await connection.promise().query(statement, comment)
    return data
}

export const isReplyComment = async (commentId: number) => {
    const statement = `
        select parentId from comment
        where id = ?
    `
    const [data] = await connection.promise().query(statement, commentId)
    return !!data[0].parentId
}

export const updateComment = async (comment: CommentModel) => {
    const statement = `
        update comment 
        set content = ?
        where id = ?
    `
    const [data] = await connection.promise().query(statement, [comment.content, comment.id])
    return data
}

export const deleteComment = async (commentId: number) => {
    const statement = `
        delete from comment 
        where id = ?
    `
    const [data] = await connection.promise().query(statement, commentId)
    return data
}
