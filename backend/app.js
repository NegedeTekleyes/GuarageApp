
const express = require('express')
const app = express()
// import env and call config file to load it
require('dotenv').config();
// Import the sanitizer module 
const cors = require('cors')
const sanitize = require('sanitize');


const corsOption = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOption))
// app.options(cors(corsOption))
app.use(express.json())
app.use(sanitize.middleware)
// Create a variable to hold our port number 
const router = require('./routes')
app.use(router)
// const employeeRoute = require('../backend/routes/employee.routes')
// const loginRoute = require('./routes/login.routes')
const port = process.env.PORT
// app.use('/api/employee/login', loginRoute)
        //  We will need to add it on our app as a middleware 

// add the routes as a medileware b/4 the webserver start
// const aiRoute = require('./routes/aiRoute')
// app.use('api/ai', aiRoute)
// Start webserver
app.listen(port, () => {
console.log(`Server running on Port!" ${port}`)
})
// module export
module.exports = app;