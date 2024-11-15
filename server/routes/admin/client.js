const express = require('express')
const router = express.Router();


const registrationController = require('../../controller/registration');


router.post('/register-client',registrationController.createclient) // craete client 
router.post('/register-updateclient',registrationController.updateClient) // udpate client
router.put('/register-deleteclient',registrationController.deleteClient) // delete client
router.get('/register-getClientdata/:id', registrationController.getClientId); //get staff using id



module.exports = router;
