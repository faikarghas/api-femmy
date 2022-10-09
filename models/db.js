const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = require('./config')
const { Attr } = require('./attr')
const { Sequelize } = require('sequelize')

const seq = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})

const Table = {
    Logs: seq.define('logs', Attr.LogAttr),
    Resellers: seq.define('resellers', Attr.ResellerAttr),
    Questions: seq.define('questions', Attr.QuestionAttr),
}

module.exports = {
    seq, Table
}
