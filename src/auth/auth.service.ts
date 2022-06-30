import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../app/app.config'
import { connection } from '../app/database/mysql'

interface SignTokenOptions {
    payload?: any
}

export const signToken = (options: SignTokenOptions) => {
    const {payload} = options
    return jwt.sign(payload, PRIVATE_KEY, {algorithm: 'RS256'})
}

interface ProcessOptions {
    resourceId: number
    resourceType: string
    userId: number
}

export const possess = async (options: ProcessOptions) => {
    const {resourceId, resourceType, userId} = options
    const statement = `
        select count(${resourceType}.id) as count
        from ${resourceType}
        where ${resourceType}.id = ? and userId = ?
    `
    const [data] = await connection.promise().query(statement, [resourceId, userId])
    return !!data[0].count
}
