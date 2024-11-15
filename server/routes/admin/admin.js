const express = require('express')
const router = express.Router();


const registrationController = require('../../controller/registration');



router.post('/register-admin', registrationController.createadmin)//create admin
router.post('/register-updateadmin' ,registrationController.updateAdmin) //update admin
router.put('/register-deleteAdmin',registrationController.deleteAdmin) //delete admin
router.get('/register-getadmindata/:id', registrationController.getAdminId); //get staff using id



module.exports = router;