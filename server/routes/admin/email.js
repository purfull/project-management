//export files

const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const emailregistercontroll = require('../../controller/email/registration')












router.post("/send-email",emailregistercontroll.sendmail)

module.exports =router;