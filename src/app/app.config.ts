import dotenv from 'dotenv'

dotenv.config()

export const {
    APP_PORT,
    MYSQL_PORT,
    MYSQL_PASSWORD,
    MYSQL_USER,
    MYSQL_HOST,
    MYSQL_DATABASE,
    POSTS_PRE_PAGE
} = process.env

export let {
    PRIVATE_KEY,
    PUBLIC_KEY
} = process.env
PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString()
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, 'base64').toString()
