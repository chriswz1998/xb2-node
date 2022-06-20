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

interface GetUserOptions {
    password?: boolean
}

export const getUsersByName = async (name: string, options: GetUserOptions = {}) => {
    const {password} = options
    const statement = `
        select 
            id,
            name
            ${password ? ', password' : ''}
        from user
            where name = ?
    `
    const [data] = await connection.promise().query(statement, name)
    return data[0]
}
