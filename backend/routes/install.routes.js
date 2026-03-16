const express = require('express');
// import router method from express
const router = express.Router();
         // Import the install controller 
const installController = require("../controllers/install.controller")

          // Create a route to handle the install request 
router.get('/install', installController.install)
          // Export the router why to go to controller
          module.exports = router;
