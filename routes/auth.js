const express = require('express')
const auth = express.Router()
const { log, httpLog } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const { isEmailValid, isPhoneValid } = require('../utils/checker')
const { GenerateHmac, buildToken, verifyRefreshToken, GenerateJwt } = require('../utils/encoder')
const { seq, Table } = require('../models/db')
const { Sequelize } = require('sequelize')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/config')

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

auth.post('/register-reseller', async(req, res) => {
        if (isEmailValid(req.body.email) && req.body.password != null){
            let checkEmail = await Table.Users.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (checkEmail == null) {
                let newReseller = {
                    username: req.body.username,
                    email: req.body.email,
                    role: 1,
                    password: GenerateHmac(req.body.password),
                    phoneNumber:req.body.phoneNumber,
                    occupation:req.body.occupation,
                    city:req.body.city,
                    district:req.body.district,
                    address:req.body.address,
                    instagram:req.body.instagram,
                    tiktok:req.body.tiktok,
                    fullName: req.body.fullName,
                }
                Table.Users.create(newReseller)
                .then(() => {
                    let resp = httpRes(200, 'Success', newReseller)
                    res.status(200).json(resp)
                }).catch((err) => {
                    console.log(err);
                    let resp = httpRes(400, 'Bad request', err.errors)
                    res.status(400).json(resp)
                })
            } else {
                let resp = httpRes(400, 'Bad request', 'Email sudah terdaftar')
                res.status(400).json(resp)
            }

        } else {
            let resp = httpRes(400, 'Bad request', 'Invalid email and / or password')
            res.status(400).json(resp)
        }

})

auth.post('/register-bestie', async(req, res) => {
    if (isEmailValid(req.body.email) && req.body.password != null){
        let checkEmail = await Table.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if (checkEmail == null) {
            let newReseller = {
                fullName: req.body.fullName,
                email: req.body.email,
                role: 2,
                password: GenerateHmac(req.body.password),
                city:req.body.city,
                district:req.body.district,
                address:req.body.address,
            }

            Table.Users.create(newReseller)
            .then(() => {
                let resp = httpRes(200, 'Success', newReseller)
                res.status(200).json(resp)
            }).catch((err) => {
                console.log(err);
                let resp = httpRes(400, 'Bad request', err.errors)
                res.status(400).json(resp)
            })
        } else {
            let resp = httpRes(400, 'Bad request', 'Email sudah terdaftar')
            res.status(400).json(resp)
        }

    } else {
        let resp = httpRes(400, 'Bad request', 'Invalid email and / or password')
        res.status(400).json(resp)
    }
})

auth.post('/login', async(req, res) => {
    if (isEmailValid(req.body.email) && req.body.password != null){
        // cek pada table user apakah email dan password ada
        let user = await Table.Users.findOne({
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


            // kirim set cookie pada client dan kirim respond status
            Table.Users.update(
                { refreshToken: refreshToken },
                { where: { id: user.dataValues.id } }
            )
            .then(() => {
                let resp = httpRes(200, 'Success', {accessToken,refreshToken})
                res.status(200).json(resp)
            }).catch((err) => {
                console.log(err);
                let resp = httpRes(400, 'Bad request', err.errors)
                res.status(400).json(resp)
            })

        }
    } else {
        let resp = httpRes(400, 'Bad request', 'Invalid email and / or password')
        res.status(400).json(resp)
    }
})

auth.post('/refresh-token',async(req, res) => {

    if (!req.body.refreshToken) {
        res.status(400).json({err:'Invalid refresh token'})
        return;
    }

    let token = await Table.Users.findOne({
        where: {
            refreshToken: req.body.refreshToken
        }
    })

    if (token) {
        jwt.verify(req.body.refreshToken, JWT_KEY, (err, tokenDetails) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    accessToken: '',
                    message: "Refresh token expired",
                })
                return;
            }
            const payload = { userId: tokenDetails.userId, role: tokenDetails.role };
            console.log(tokenDetails);
            const accessToken = GenerateJwt(payload,5*60)
            res.status(200).json({
                error: false,
                accessToken,
                message: "Access token created successfully",
            });

        });
    } else {
        res.status(400).json({err:'tidak bisa'})
    }
})

auth.post('/logout',async(req, res) => {

})

auth.post('/send-email',async (req, res) => {
    const Sib = require('sib-api-v3-sdk')
    require('dotenv').config()
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY

    console.log(req.body.email);

    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
        email: 'owlandfoxes@gmail.com',
        name: 'Onf',
    }
    const receivers = [
        {
            email: req.body.email,
        },
    ]

    tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Subscribe to Cules Coding to become a developer',
        textContent: `
        Cules Coding will teach you how to become {{params.role}} a developer.
        `,
        htmlContent: `
        <h1>Selamat datang di femmy</h1>
        <a href="https://cules-coding.vercel.app/">Visit</a>
                `,
        params: {
            role: 'Frontend',
        },
    })
    .then((response)=>{
        console.log(response);
        res.status(200).json({msg:'terkirim'})
    })
    .catch((e)=>{
        console.log(e);
        res.status(200).json({err:'tdk terkirim'})
    })
})


module.exports = auth