import { connection } from '../app/database/mysql'
import { PostModel } from './post.model'

export const getPosts = async () => {
    const statement = `
        SELECT 
            post.id, 
            post.title, 
            post.content, 
        JSON_OBJECT(
            'userId', user.id,
            'name', user.name
        ) AS user
        FROM post
        LEFT JOIN user
            ON user.id = post.userId
    `
    const [data] = await connection.promise().query(statement)
    return data
}

export const createPost = async (post: PostModel) => {
    const statement = `
        insert into post
        set ?
    `
    const [data] = await connection.promise().query(statement, post)
    return data
}

export const updatePost = async (postId: number, post: PostModel) => {
    const statement = `
        update post
        set ?
        where id = ?
    `
    const [data] = await connection.promise().query(statement, [post, postId])
    return data
}

export const deletePost = async (postId: number) => {
    const statement = `
        delete from post
        where id = ?
    `
    const [data] = await connection.promise().query(statement, postId)
    return data
}
