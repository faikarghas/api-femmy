// dependencies
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { log, httpLog } = require('./utils/logger')
const { httpRes } = require('./utils/responder')
const dotenv = require('dotenv')
dotenv.config()

// routes source
const app = express()
const resellers = require('./routes/resellers')
const questions = require('./routes/questions')

// middlewares
app.use(express.json())
app.use(cors())
app.set('trust proxy', true)
app.disable('etag')
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})

// home routes
const info = fs.readFileSync('package.json')
const package = JSON.parse(info)
app.get('/', (req, res) => {
    let resp = httpRes(res.statusCode, 'Success', {
        name: package.name,
        version: package.version,
        description: package.description, 
    })
    log('ok', httpLog(req, resp))
    res.status(200).json(resp)
})

// routes endpoint
app.use('/reseller', resellers)
app.use('/question', questions)

// error handler
app.use((req, res, next) => {
    return res.status(404).json({ status: 404, error: 'Not found' })
})
app.use((error, req, res, next) => {
    return res.status(500).json({ status: 500, error: error.toString() })
})

// serve
app.listen(process.env.PORT, () => {
    log('info', `SERVER IS RUNNING ON ${process.env.PORT}`)
})