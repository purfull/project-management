const express = require('express')
const router = express.Router();




const registrationController = require('../../controller/registration');

router.post('/register-user', registrationController.createStaff);

// path for update 
router.post('/register-updateuser', registrationController.updateStaff);

// update end 

// statrt for delete api 

router.put('/register-deleteUser', registrationController.deleteStaff);


// get staff data frm  decrption 

router.get('/register-getStaffdata/:id', registrationController.getStaffById);


// ending get staff data frm  decrption 


// end  for delete api 

router.post('/register-client', registrationController.createclient);

router.post('/register-admin', registrationController.createadmin);




module.exports = router;
