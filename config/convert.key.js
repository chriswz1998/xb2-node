const fs = require('fs')
const path = require('path')

const privateKey = fs.readFileSync(path.join('./config', 'private.key'))
const publicKey = fs.readFileSync(path.join('./config', 'public.key'))
const privateKeyBase64 = Buffer.from(privateKey).toString('base64')
const publicKeyBase64 = Buffer.from(publicKey).toString('base64')
