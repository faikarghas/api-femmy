const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    JWT_ALGO: process.env.JWT_ALGO,
    JWT_ISSUER: process.env.JWT_ISSUER,
    HMAC_KEY: process.env.HMAC_KEY,
    HMAC_ALGO: process.env.HMAC_ALGO,

    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};