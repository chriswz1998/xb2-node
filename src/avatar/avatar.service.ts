import { AvatarModel } from './avatar.model'
import { connection } from '../app/database/mysql'

export const createAvatar = async (avatar: AvatarModel) => {
    const statement = `
        insert into avatar
        set ?
    `
    const [data] = await connection.promise().query(statement, avatar)
    return data
}

export const findAvatarByUserId = async (userId) => {
    const statement = `
    select * form avatar
    where userId = ?
    order by avatar.id desc
    limit 1
  `
    const [data] = await connection.promise().query(statement, userId)
    return data
}
