const express = require('express')
const router = express.Router();


const registrationController = require('../../controller/registration');

router.post('/register-user', registrationController.createStaff)



module.exports = router;
