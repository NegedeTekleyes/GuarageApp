
const express = require('express')
const router = express.Router()

const installRouter = require('./install.routes');
//           // Add the install router to the main router 
const employeeRouter = require('./employee.routes')
router.use('/install', installRouter);
router.use('/api/employee', employeeRouter)
module.exports= router;
