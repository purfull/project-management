const express = require('express')

const router = express.Router();


const registrationController = require('../../controller/registration');



router.post('/register-client',registrationController.createclient)



module.exports = router;
