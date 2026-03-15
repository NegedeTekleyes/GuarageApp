// 
const express = require('express')
// import env and call config file to load it
require('dotenv').config();
// Create a variable to hold our port number 
const port = process.env.PORT
const app = express()
// Start webserver
app.listen(port, () => {
console.log(`Server running on Port!" ${port}`)
})
// module export
module.exports = app;