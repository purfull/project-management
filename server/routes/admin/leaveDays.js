const express = require('express')

const router = express.Router()


const leaveregistrationController = require('../../controller/leave/registration');
const tokens = require('../../controller/staff/registration')




router.post('/leave',tokens.verifystaffttoken,leaveregistrationController.leavedays);



module.exports= router;