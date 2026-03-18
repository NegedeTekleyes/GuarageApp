
const express = require('express')
const router = express.Router()

const installRouter = require('./install.routes');
//           // Add the install router to the main router 
const employeeRouter = require('./employee.routes')
const loginRouter = require('./login.routes')
router.use('/install', installRouter);
router.use('/api/employee', employeeRouter)
router.use('/api/employee', loginRouter)
module.exports= router;
