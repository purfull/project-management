const express = require('express');
const router = express.Router();



const taskregistrationController = require('../../controller/task/registration');




const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgpost')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ dest: 'imgpost/', storage: storage })

router.post('/uploads',upload.single('file'),(req, res)=>{
      console.log("worked!!!!!!");
      
      
      res.json(req.file)
})




module.exports = router;
