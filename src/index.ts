import app from './app'
import { APP_PORT } from './app/app.config'
import { connection } from './app/database/mysql'

app.listen(APP_PORT, () => {
    console.log('server start 🚀')
})

connection.connect(err => {
    if (err) return console.log('数据库连接失败 ❌')
    console.log('数据库连接成功🔗')
})
