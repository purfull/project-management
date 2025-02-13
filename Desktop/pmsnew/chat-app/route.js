const express = require('express');
const router = express.Router();


const  chatregistrioncontroller =require('./controller')

router.post('/chat-message',chatregistrioncontroller.chatapplication);



const multer = require('multer');
const path = require('path');

const fs = require('fs');
const directories = [ 'chatapplication/img', 'chatapplication/files'];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

//multe rfile upload 
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const baseDir = 'chatapplication';
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

router.post('/chat-uploads', upload.any(), (req, res) => {
  console.log("Upload successful!", req.files);
  res.json({ message: "Chat file uploaded successfully!", fileDetails: req.files });
});





router.get('/chat-viewcontact/:id',chatregistrioncontroller.viewcontact)

module.exports = router