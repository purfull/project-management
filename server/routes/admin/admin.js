const express = require('express')
const router = express.Router();


const registrationController = require('../../controller/registration');



router.post('/register-admin', registrationController.createadmin)



module.exports = router;