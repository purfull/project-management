const express = require('express');
const router = express.Router();



const performanceregiscontroller = require("../../controller/performance/registration");

const tokens = require('../../controller/staff/registration')





router.post('/performance',tokens.verifystaffttoken, performanceregiscontroller.performancetracker)


module.exports= router