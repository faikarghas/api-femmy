const { JWT_KEY, JWT_ALGO, JWT_ISSUER, HMAC_ALGO, HMAC_KEY } = require('../config/config')
const jwt = require('jsonwebtoken')
const hash = require('crypto')

// generate jwt
let GenerateJwt = (data,expire) => {
    let options = { 
        algorithm: JWT_ALGO, 
        expiresIn: expire,
        issuer: JWT_ISSUER,
    }
    let token = jwt.sign(data, JWT_KEY, options)
    return token
}

// verify jwt
let VerifyJwt = (token) => {
    let valid
    let options = { 
        algorithm: JWT_ALGO, 
        expiresIn: "7d",
        issuer: JWT_ISSUER,
    }
    jwt.verify(token, JWT_KEY, options, function(err, decoded) {
        if (err) {
            valid = {
                status: false,
                message: err.message,
                data: null,
            }
        } else {
            valid = {
                status: true,
                message: 'valid jwt',
                data: decoded,
            }
        }
    })
    return valid
}

// generate hmac
let GenerateHmac = (password) => {
    let hmac = hash.createHmac(HMAC_ALGO, HMAC_KEY).update(password).digest('hex')
    return hmac
}

let buildToken = (user) => {
    const accessPayload = {userId: user.id}
    const refreshPayload = {userId: user.id}

    const accessToken = GenerateJwt(accessPayload,5*60) // 5 menit
    const refreshToken = GenerateJwt(refreshPayload,7*24*60*60) // 7 hari

    return {accessToken, refreshToken}
}

let verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_KEY)
}

module.exports = { GenerateJwt, VerifyJwt, GenerateHmac, buildToken, verifyRefreshToken }