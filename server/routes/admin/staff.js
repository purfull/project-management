const express = require('express')
const router = express.Router();



const registrationController = require('../../controller/registration');

router.post('/register-user', registrationController.createStaff);  //craete staff 
router.post('/register-updateuser', registrationController.updateStaff);  // update staff
router.put('/register-deleteUser', registrationController.deleteStaff);  // delete staff
router.get('/register-getStaffdata/:id', registrationController.getStaffById); //get staff using id


module.exports = router;
