const express = require('express')

const router = express.Router()


const leaveregistrationController = require('../../controller/leave/registration');



router.post('/register-leave',leaveregistrationController.verifystaffttoken,leaveregistrationController.leavedays);



module.exports= router