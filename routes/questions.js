const express = require('express')
const questions = express.Router()
const { log, httpLog } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const { isEmailValid, isPhoneValid } = require('../utils/checker')
const { seq, Table } = require('../models/db')

questions.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})

// add questions
questions.post('/', async(req, res) => {
    if (req.body.fullName != null && req.body.fullName != "" && req.body.question != null && req.body.question != "" && isEmailValid(req.body.email) && isPhoneValid(req.body.phone)){
        let newQuestion = {
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            question: req.body.question,
        }
        // insert question
        Table.Questions.create(newQuestion)
        .then(() => {
            let resp = httpRes(200, 'Success', newQuestion)
            res.status(200).json(resp)
            log('ok', httpLog(req, resp))
        })
        .catch(() => {
            let resp = httpRes(400, 'Bad request', 'Failed inserting new question')
            res.status(400).json(resp)
            log('error', httpLog(req, resp))
        })
    } else {
        let resp = httpRes(400, 'Bad request', 'Invalid body request')
        res.status(400).json(resp)
        log('error', httpLog(req, resp))
    }
})

// get questions list
questions.get('/', async(req, res) => {
    let questions = await Table.Questions.findAll({})
    if (questions == null){
        let resp = httpRes(400, 'Bad request', 'Data not found')
        res.status(400).json(resp)
        log('error', httpLog(req, resp))
    } else {
        let resp = httpRes(200, 'Success', questions)
        res.status(200).json(resp)
        log('ok', httpLog(req, resp))
    }
})

module.exports = questions