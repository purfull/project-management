//export files

const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const emailregistercontroll = require('../../controller/email/registration')












router.post("/register-send-mail",emailregistercontroll.sendmail)

module.exports =router;