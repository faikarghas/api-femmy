const express = require('express')
const auth = express.Router()
const { log, httpLog } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const { isEmailValid, isPhoneValid } = require('../utils/checker')
const { GenerateHmac, buildToken, verifyRefreshToken, GenerateJwt } = require('../utils/encoder')
const { seq, Table } = require('../models/db')

auth.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})


// get reseller list
auth.get('/', async(req, res) => {
    let resellers = await Table.Users.findAll({})
    if (resellers == null){
        let resp = httpRes(400, 'Bad request', 'Data not found')
        res.status(400).json(resp)
        // log('error', httpLog(req, resp))
    } else {
        let resp = httpRes(200, 'Success', resellers)
        res.status(200).json(resp)
        // log('ok', httpLog(req, resp))
    }
})

auth.post('/register', async(req, res) => {
    if (isEmailValid(req.body.email) && req.body.password != null){
        Table.Users.create({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role ? req.body.role : 0,
            password: GenerateHmac(req.body.password),
            phoneNumber:req.body.phoneNumber,
            occupation:req.body.occupation,
            city:req.body.city,
            district:req.body.district,
            address:req.body.address,
            instagram:req.body.instagram,
            tiktok:req.body.tiktok,
        })
        .then(async(item) => {
            let user = item.dataValues
            console.log(user);

            // user = await Table.Users.findOne({ where: user })
            // console.log(user);
            // if (user == null){
            //     let resp = httpRes(400, 'Bad request', 'User not found')
            //     res.status(400).json(resp)
            // } else {
            //     user.dataValues.token = GenerateJwt({
            //         id: user.dataValues.id,
            //         username: user.dataValues.username,
            //         email: user.dataValues.email,
            //         role: user.dataValues.role
            //     },7*24*60*60)
            //     delete user.dataValues.password
            //     let resp = httpRes(200, 'Success', user)

            //     res.status(200).json(resp)
            // }
        }).catch((err) => {
            let resp = httpRes(400, 'Bad request', err.errors)
            res.status(400).json(resp)
        })
    } else {
        let resp = httpRes(400, 'Bad request', 'Invalid email and / or password')
        res.status(400).json(resp)
    }
})

auth.post('/login', async(req, res) => {
    if (isEmailValid(req.body.email) && req.body.password != null){
        // cek pada table user apakah email dan password ada
        let user = await Model.user.findOne({
            where: {
                email: req.body.email, password: GenerateHmac(req.body.password)
            }
        })
        if (user == null){
            // jika tidak ada kirim respond 400
            let resp = httpRes(400, 'Bad request', 'User not found')
            res.status(400).json(resp)
        } else {
            // jika ada maka beri client refresh token dan access token
            // generate refresh token dan access token melalui fn buildToken
            const {accessToken, refreshToken} = buildToken(user)

            // set config untuk cookie
            const defaultCookieOption = {
                httpOnly: true,
                secure: false // true apabila di production
            }
            // set config utk access token
            const accessTokenOption = {
                ...defaultCookieOption,
                maxAge: (5*60) * 1000
            }
            // set config utk refresh token
            const refreshTokenOption = {
                ...defaultCookieOption,
                maxAge: (7*24*60*60) * 1000
            }

            // kirim set cookie pada client dan kirim respond status
            res.cookie('accessToken',accessToken,accessTokenOption)
            res.cookie('refreshToken',refreshToken,refreshTokenOption)

            let resp = httpRes(200, 'Success', {})
            res.status(200).json(resp)

            console.log(accessToken,'accessToken');
            console.log(refreshTokenOption,'refreshTokenOption');

        }
    } else {
        let resp = httpRes(400, 'Bad request', 'Invalid email and / or password')
        res.status(400).json(resp)
    }
})

module.exports = users