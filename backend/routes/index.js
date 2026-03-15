// 
const express = require('express')
const route = express.Router()

const installRouter = require('./install.routes')
const { router } = require('../app')
          // Add the install router to the main router 
router.use(installRouter);
module.exports= router;
