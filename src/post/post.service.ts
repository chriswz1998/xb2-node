import { connection } from '../app/database/mysql'
import { PostModel } from './post.model'
import { sqlFragment } from './post.provider'

export const getPosts = async () => {
    const statement = `
        SELECT 
            post.id, 
            post.title, 
            post.content, 
        ${sqlFragment.user},
        ${sqlFragment.totalComments},
        ${sqlFragment.file}
        FROM post
       ${sqlFragment.leftJoinUser}
       ${sqlFragment.leftJoinOneFile}
       group by post.id
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

export const createPostTag = async (postId: number, tagId: number) => {
    const statement = `
        insert into post_tag (postId, tagId)
        values(?, ?)
    `
    const [data] = await connection.promise().query(statement, [postId, tagId])
    return data
}

export const postHasTag = async (postId: number, tagId: number) => {
    const statement = `
    select * from post_tag
    where postId=? and tagId=?
`
    const [data] = await connection.promise().query(statement, [postId, tagId])
    return !!data[0]
}

export const deletePostTag = async (postId: number, tagId: number) => {
    const statement = `
        delete from post_tag
        where postId = ? and tagId = ?
    `
    const [data] = await connection.promise().query(statement, [postId, tagId])
    return data
}
