// import employee services
const employeeService = require('../service/employee.service')
// create a function that handle controller
async function  createEmployee(req, res, next)  {
    // check the employee exist or not
    const employeeExists = await employeeService.checkEmployeeExists(req.body.employee_email)

    // if exists
    if(employeeExists) {
        res.status(400).json({
            error: "This employee is alredy exist"
        })
    } else {
        try {
            const employeeData = req.body;
            // create employee
            const employee = await employeeService.createEmployee(employeeData)
            if(!employee) {
                res.status(400).json({
                    error: "Failed to add Employee"
                })
            } else {
                res.status(200).json({
                    status: "Success",
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                error: "Something went error"
            })
        }
    }
    
}
module.exports = {
    createEmployee,
}
    