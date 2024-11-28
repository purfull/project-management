const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const taskregistrationController = require('../../controller/task/registration');


const fs = require('fs');
const directories = ['taskmanagement', 'taskmanagement/img', 'taskmanagement/files'];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});



//multe rfile upload 
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const baseDir = 'taskmanagement';
    let folder = 'files'; 

    if (file.mimetype.startsWith('image/')) {
      folder = 'img';
    }

    const finalDir = path.join(baseDir, folder);

    cb(null, finalDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});


const upload = multer({ storage: storage });


router.post('/uploads', upload.array('file',10), (req, res) => {

  console.log("worked!!!!!!");

  res.json({message: "File uploaded successfully!",fileDetails: req.files});

});//ending file uload












router.post('/register-task',taskregistrationController.createTask);

router.put('/register-updatetask',taskregistrationController.updateTask)

module.exports = router;
