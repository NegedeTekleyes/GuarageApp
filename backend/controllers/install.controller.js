// Import the install service to handle communication with the database 
const installService = require("../service/install.service")
          // Create a function to handle the install request
async function install(req,res, next) {
                // Call the install service to create the database tables 
const installMessage = await installService.install()
            // Check the message returned from the service 
if (installMessage.status == 200) {
    res.status(200).json({
        message: installMessage

    })
} else {
    res.status(500).json({
        message: installMessage
    })
}
}
module.exports = {install} 