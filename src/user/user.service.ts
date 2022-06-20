import { connection } from '../app/database/mysql'
import { UserModel } from './user.model'

export const createUser = async (user: UserModel) => {
    const statement = `
        insert into user
        set ?
    `
    const [data] = await connection.promise().query(statement, user)
    return data
}

export const getUsersByName = async (name: string) => {
    const statement = `
        select id, name from user
        where name = ?
    `
    const [data] = await connection.promise().query(statement, name)
    return data[0]
}
