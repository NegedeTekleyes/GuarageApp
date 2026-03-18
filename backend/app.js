
const express = require('express')
// import env and call config file to load it
require('dotenv').config();
// Import the sanitizer module 
const sanitize = require('sanitize');
// import cors
const cors = require('cors')

const corsOption = {
    origin: process.env.FRONTEND_URL,
    optionsSucessStatus: 200,
}
// Create a variable to hold our port number 
const router = require('./routes')
// const employeeRoute = require('../backend/routes/employee.routes')
// const loginRoute = require('./routes/login.routes')
const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(router)
// app.use('/api/employee/login', loginRoute)
        //  We will need to add it on our app as a middleware 

app.use(sanitize.middleware)
app.use(cors(corsOption))
// add the routes as a medileware b/4 the webserver start
app.use(router);
// const aiRoute = require('./routes/aiRoute')
// app.use('api/ai', aiRoute)
// Start webserver
app.listen(port, () => {
console.log(`Server running on Port!" ${port}`)
})
// module export
module.exports = app;