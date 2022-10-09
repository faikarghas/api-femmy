const express = require('express')
const resellers = express.Router()
const { log, httpLog } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const { isEmailValid, isPhoneValid } = require('../utils/checker')
const { seq, Table } = require('../models/db')

resellers.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})

// register resellers
resellers.post('/', async(req, res) => {
    if (req.body.fullName != null && req.body.fullName != "" && req.body.consultantName != null && req.body.consultantName != "" && isEmailValid(req.body.email) && isPhoneValid(req.body.whatsAppNo)){
        let newReseller = {
            fullName: req.body.fullName,
            consultantName: req.body.consultantName,
            occupation: req.body.occupation,
            address: req.body.address,
            whatsAppNo: req.body.whatsAppNo,
            email: req.body.email,
            instagram: req.body.instagram,
            tiktok: req.body.tiktok,
        }
        // insert reseller
        Table.Resellers.create(newReseller)
        .then(() => {
            let resp = httpRes(200, 'Success', newReseller)
            res.status(200).json(resp)
            log('ok', httpLog(req, resp))
        })
        .catch(() => {
            let resp = httpRes(400, 'Bad request', 'Failed inserting new reseller')
            res.status(400).json(resp)
            log('error', httpLog(req, resp))
        })
    } else {
        let resp = httpRes(400, 'Bad request', 'Invalid body request')
        res.status(400).json(resp)
        log('error', httpLog(req, resp))
    }
})

// get reseller list
resellers.get('/', async(req, res) => {
    let resellers = await Table.Resellers.findAll({})
    if (resellers == null){
        let resp = httpRes(400, 'Bad request', 'Data not found')
        res.status(400).json(resp)
        log('error', httpLog(req, resp))
    } else {
        let resp = httpRes(200, 'Success', resellers)
        res.status(200).json(resp)
        log('ok', httpLog(req, resp))
    }
})

module.exports = resellers