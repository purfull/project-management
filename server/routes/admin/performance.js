const express = require('express');
const router = express.Router();



const performanceregiscontroller = require("../../controller/performance/registration");






router.post('/register-performance',performanceregiscontroller.verifystaffttoken, performanceregiscontroller.performancetracker)


module.exports= router